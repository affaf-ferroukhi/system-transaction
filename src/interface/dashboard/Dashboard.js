import React, { useState , useEffect} from "react"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LaunchOrder from "./LaunchOrder.js";
import logo from '../../assets/cpa-logo1.png';
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import RealTime from "./RealTime.js";
import App from "../../App.js";
import {
  Box,
  CssBaseline,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const drawerWidth = 240;
function Dashboard({orders = [],rejectOrder, setOrders} , children  ) {
  const navigate = useNavigate();
  console.log("Ordres reçus dans Dashboard :", orders);

  
    const today = new Date().toLocaleDateString();
    const now = new Date().toLocaleTimeString();
    const time = RealTime();
    const [editingOrder, setEditingOrder] = useState(null);
    const [filter, setFilter] = useState("all"); // Filtre par défaut : tous les ordres
    const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
  
     // Filtrer les ordres en fonction du filtre et du terme de recherche

  const filteredOrders = orders.filter((order) => {
    if (filter === "achat" && order.orderType !== "achat") return false;
    if (filter === "vente" && order.orderType !== "vente") return false;
    if (
      searchTerm && 
      !`${order.firstName} ${order.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });
    const handleEdit = (order) => {
      navigate("/LaunchOrder", { state: { orderToEdit: order } });
    };

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/orders");
          setOrders(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des ordres :", error);
        }
      };
  
      fetchOrders();
    }, []);

  return(  
    <Box sx={{ display: "flex" , height: "100%",overflowY: "auto",}}>
      {children.key}
      <CssBaseline />

      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,  backgroundColor: "#1976d2", }}>
        <Toolbar>
        
          <Typography variant="h6" noWrap component="div">
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography>Agence Amirouche 	     </Typography>
          <br/>
          <Typography  sx={{ ml: 4 }}>(108) </Typography>
          <Typography  sx={{ ml: 4 }}> Fatima Fatima </Typography>
          <Typography  sx={{ ml: 4 }}>Date: {today}</Typography>
          <Typography  sx={{ ml: 4 , mr:40 }}>{time}</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1976d2", // Sidebar color (same as AppBar)
            color: "white", // Text color in the sidebar
            
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src={logo} alt="Logo" style={{ width: '235px', marginTop:'5px' , marginBottom:'2px'}} />
        
        <List style={{  marginTop:'5px' }} > 
          {["Traitement des Ordres ", "Ordres non executès", "Ordres executès"].map((text, index) => (
            <ListItem button={true} key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
         
        </Typography>

        {/* Filter Tabs */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
            <Button
              variant={filter === "all" ? "contained" : "outlined"}
              onClick={() => setFilter("all")}
              sx={{ mr: 1 }}
            >
              Tout les Ordres
            </Button>
            <Button
              variant={filter === "achat" ? "contained" : "outlined"}
              onClick={() => setFilter("achat")}
              sx={{ mr: 1 }}
            >
              Ordres D'achat
            </Button>
            <Button
              variant={filter === "vente" ? "contained" : "outlined"}
              onClick={() => setFilter("vente")}
              sx={{ mr: 1 }}
            >
              Ordres de vente
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
          <TextField
            label="Rechercher un client"
            variant="outlined"
            size="small"

            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

          <Button variant="contained" color="primary" onClick={() => navigate("/LaunchOrder")}>
            + Ajouter un Ordre 
          </Button>
        </Box>

          {/* Notes Grid */}
          <Grid container spacing={3}>
          { filteredOrders.map((order, index) => (
            <Grid item xs={12} sm={6} md={4} key={order.orderId || index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Ordre {index + 1}</Typography>
                  <Typography >{order.firstName} {order.lastName}</Typography>
                  <Typography >Type: {order.orderType}</Typography>
                  <Typography >Date: {order.dateTime}</Typography>
                  <Typography >Valeur: {order.actionValue} {order.actionQuantity}</Typography>
                  <Typography varia3nt="body2" color="text.secondary">
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button size="small" color="primary" onClick={() => handleEdit(order)}>
                      Editer
                    </Button>
                    <Button size="small" color="error" sx={{ ml: 1 }} onClick={() => rejectOrder(order.orderId)}>
                      rejeter
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
            
        </Grid>
      </Box>
      </Box>
  );
}

export default Dashboard;
