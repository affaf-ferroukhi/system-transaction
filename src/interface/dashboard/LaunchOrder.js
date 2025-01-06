import React, { useState , useEffect } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import axios from "axios";
import logo from '../../assets/cpa-logo1.png';
import SubscriptionModal from "./SubscriptionModal";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Table,
  TableCell,
  TableRow, 
  TableBody,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const LaunchOrder = ( { addOrder , updateOrder ,orders }) => {
  const [formData, setFormData] = useState({
    orderType: "",
    agencyNumber: "", 
    firstName: "",
    lastName: "",
    dateofbirth: "",
    placeofbirth: "",
    Adress: "",
    city: "",
    idCardNumber: "",
    Nationality: "",
    companyname: "",
    agrement: "",
    segmentsouscripteur: "",
    email: "",
    phone: "",
    actionValue: "",
    actionQuantity: "",
    certificateNumber: "",
    minPrice: "",
    maxPrice: "",
    validity: "",
    consent: false,
    signature: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [existingOrder, setExistingOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (location.state?.orderToEdit) {
      setFormData(location.state.orderToEdit); // Préremplir avec les données existantes
    }
  }, [location.state]);

  useEffect(() => {
    const existing = orders.find(
      (order) =>
        order.firstName === formData.firstName &&
        order.lastName === formData.lastName &&
        order.orderId !== formData.orderId // Évite de se comparer avec l'ordre actuel
    );
    setExistingOrder(existing || null);
  }, [formData, orders]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateTime = new Date().toLocaleString(); // Générer la date et l'heure
    const orderId = `AG-${Math.floor(Math.random() * 1000)}-${formData.certificateNumber}`; // Numéro séquentiel
    const newOrder = { ...formData, dateTime, orderId };
    if (formData.orderId) {
      updateOrder(formData); // Mettre à jour l'ordre existant
    } else {
    const newOrder = { ...formData, dateTime, orderId };
    addOrder({ ...formData, dateTime, orderId }); // Enregistre l'ordre 
    }
    navigate("/dashboard"); // Redirige vers le tableau de bord
    console.log("Form submitted:", formData);
    alert("Ordre ajouté avec succès !");
   

    try {
      const response = await axios.post("http://localhost:3000/api/orders", newOrder);
      console.log("Ordre ajouté avec succès :", newOrder);
      addOrder(newOrder); // Ajoute à l'état des ordres
      navigate("/dashboard"); // Redirige vers le tableau de bord
    } catch (error) {
      console.error("Erreur lors de la soumission de l'ordre", error);
    }
  };
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleValidate = (order) => {
    console.log("Validation de l'ordre :", order);
    setExistingOrder(null);
    alert(`L'ordre ${order.orderId} a été validé.`);
  };
  const handleCloseModal = () => {
    setExistingOrder(null);
  };

  return (
   <div style={{height: "100%",overflowY: "auto",}}>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
        
      }}
    >
       
      <Typography variant="h4" mb={3} textAlign="left">
      <img src={logo} alt="Logo" style={{ width: '250px'}} />
      <br/>
        Ajouter un Ordre
      </Typography>

      {/* Type d'ordre */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="order-type-label">Type d'ordre</InputLabel>
        <Select
          labelId="order-type-label"
          name="orderType"
          value={formData.orderType}
          onChange={handleChange}
          required
        >
          <MenuItem value="achat">Achat</MenuItem>
          <MenuItem value="vente">Vente</MenuItem>
        </Select>
      </FormControl>

      {/* Numero de l'agence */}
        <Grid item xs={6}>
          <TextField
            label="numéro de l'agence"
            name="agencyNumber"
            fullWidth
            value={formData.agencyNumber}
            onChange={handleChange}
            required
          />
        </Grid>

      {/* Informations personnelles */}
      <br/>
      <Typography variant="h6" gutterBottom>
        Informations personnelles
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Prénom"
            name="firstName"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nom"
            name="lastName"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date de naissance"
            name="dateofbirth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dateofbirth}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Lieu de naissance"
            name="placeofbirth"
            fullWidth
            value={formData.placeofbirth}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Numéro de carte d'identité (CIN)"
            name="idCardNumber"
            fullWidth
            value={formData.idCardNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={15}>
          <TextField
            label="Adresse"
            name="Adress"
            fullWidth
            value={formData.Adress}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="wilaya"
            name="city"
            fullWidth
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nationalité"
            name="Nationality"
            fullWidth
            value={formData.Nationality}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Raison social"
            name="companyname"
            fullWidth
            value={formData.companyname}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="RC/Agrèment N°"
            name="agrement"
            fullWidth
            value={formData.agrement}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Adresse email"
            type="email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Numéro de téléphone"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      <Typography variant="h6" mt={4} gutterBottom>
        Souscripteur
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="segment">Ségment Souscripteur</InputLabel>
        <Select
          labelId="segment"
          name="segmentsouscripteur"
          value={formData.segmentsouscripteur}
          onChange={handleChange}
          required
        >
          <MenuItem value="personnep">A: Personne Physique Algerienne</MenuItem>
          <MenuItem value="salarie">B: Salarie du CPA</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="role-select-label">Souscripteur agissant en qualité de</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={role}
          onChange={handleRoleChange}
          required
        >
          <MenuItem value="propre">Propre</MenuItem>
          <MenuItem value="mandataire">Mandataire</MenuItem>
          <MenuItem value="tuteur">Tuteur</MenuItem>
        </Select>
      </FormControl>
      {/* Formulaire supplémentaire si Mandataire ou Tuteur est sélectionné */}
      {(role === "mandataire" || role === "tuteur") && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Informations {role}
          </Typography>
          <Grid container spacing={2}>
            {/* Civilité */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="civilite-label">Civilité</InputLabel>
                <Select labelId="civilite-label" id="civilite-select">
                  <MenuItem value="mr">Monsieur</MenuItem>
                  <MenuItem value="mme">Madame</MenuItem>
                  <MenuItem value="mlle">Mademoiselle</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Nom */}
            <Grid item xs={12} sm={6}>
              <TextField label="Nom" fullWidth required />
            </Grid>
            {/* Prénom */}
            <Grid item xs={12} sm={6}>
              <TextField label="Prénom" fullWidth required />
            </Grid>
            {/* Date de naissance */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date de naissance"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
            {/* Numéro de pièce d'identité */}
            <Grid item xs={12} sm={6}>
              <TextField label="Numéro de carte d'identité (CIN)" fullWidth required />
            </Grid>
            {/* Adresse */}
            <Grid item xs={12} sm={6}>
              <TextField label="Adresse" fullWidth required />
            </Grid>
            {/* Wilaya */}
            <Grid item xs={12} sm={6}>
              <TextField label="Wilaya" fullWidth required />
            </Grid>
            {/* Nationalité */}
            <Grid item xs={12} sm={6}>
              <TextField label="Nationalité" fullWidth required />
            </Grid>
            {/* Numéro de téléphone */}
            <Grid item xs={12} sm={6}>
              <TextField label="Téléphone" type="tel" fullWidth required />
            </Grid>
          </Grid>
        </Box>
      )}
      <br/>
      <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="civilite-label">Civilité</InputLabel>
                <Select labelId="civilite-label" id="civilite-select">
                  <MenuItem value="mr">Monsieur</MenuItem>
                  <MenuItem value="mme">Madame</MenuItem>
                  <MenuItem value="mlle">Mademoiselle</MenuItem>
                </Select>
              </FormControl>
            </Grid>

      {/* Informations de l'ordre */}
      <Typography variant="h6" mt={4} gutterBottom>
        Informations de l'ordre
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Valeur de l'action"
            name="actionValue"
            type="number"
            fullWidth
            value={formData.actionValue}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantité d'actions"
            name="actionQuantity"
            type="number"
            fullWidth
            value={formData.actionQuantity}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Numéro de certificat"
            name="certificateNumber"
            fullWidth
            value={formData.certificateNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Prix minimum"
            name="minPrice"
            type="number"
            fullWidth
            value={formData.minPrice}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Prix maximum"
            name="maxPrice"
            type="number"
            fullWidth
            value={formData.maxPrice}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Validité de l'ordre"
            name="validity"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.validity}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      {/* Consentement */}
      <FormControlLabel
        control={
          <Checkbox
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
        }
        label="J'autorise l'utilisation de mon email et de mon numéro de téléphone."
        sx={{ mt: 3 }}
      />

      {/* Signature électronique */}
      <TextField
        label="Signature électronique (nom ou fichier)"
        name="signature"
        fullWidth
        value={formData.signature}
        onChange={handleChange}
        placeholder="Entrez votre signature ou téléchargez un fichier."
        sx={{ mt: 3, mb: 3 }}
      />

      {/* Bouton de soumission */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {formData.orderId ? "Mettre à jour l'ordre" : "Ajouter un ordre"}
      </Button>
    </Box>

    <SubscriptionModal
        existingOrder={existingOrder}
        onClose={handleCloseModal}
        onValidate={handleValidate}
      />

    
    </div> 
  );
};

export default LaunchOrder;
