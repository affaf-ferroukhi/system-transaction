const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../db");
const path = require("path");

const orderRoutes = require("../routes/orders");
const Order = require("../models/Order");
const authRoutes = require("../routes/auth");
const orderBook = require('../routes/orderBooks');
//const ordersTcc = require('../routes/ordersTcc');
const stockTitleRoutes = require('../routes/stockTitles');
const accountRoutes = require('../routes/accounts');
//const OrderBooks  = require("../interface/tcc/OrderBooks");
const cors = require('cors');


const app = express();

connectDB();
// Middleware
app.use(express.json());
// Routes
app.use(cors());
app.use("/api/orders", orderRoutes); // Lier la route à "/api/orders"
app.use('/api/auth', authRoutes);
app.use('/api/stockTitles', stockTitleRoutes); // Routes pour le stock titre
app.use('/api/accounts', accountRoutes); // Routes pour les comptes titres
app.use('/api/orderBooks', orderBook); // Routes pour le stock titre
app.get('/agentsession', (req, res) => {
  res.status(200).json({ message: 'Bienvenue, agent', sessions: [] });
});
app.use('/ws', (req, res) => {
  res.status(404).send('WebSocket désactivé');
});

const clientBuildPath = path.join(__dirname, 'client', 'build');
//app.use(express.static(clientBuildPath));

/*app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});*/

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username et password requis' });
  }

  if (username === 'admin' && password === 'admin123') {
    return res.status(200).json({ message: 'Connexion réussie' });
  }

  return res.status(401).json({ message: 'Identifiants incorrects' });
});

app.get("/", (req, res) => {
  res.status(200).send("Le serveur fonctionne !");
});

// Routes API
/*router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'ordre :", error.message);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'ordre" });
  }
});*/

/*router.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des ordres" });
  }
});*/


/*app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Error creating order" });
  }
});*/

/*app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});*/

app.get("/test", async (req, res) => {
  try {
    const testConnection = await mongoose.connection.db.admin().ping();
    res.json({ message: "MongoDB Connected", testConnection });
  } catch (error) {
    console.error("Test Connection Error:", error.message);
    res.status(500).json({ message: "Erreur de connexion MongoDB" });
  }
});
/*app.post("/api/test", (req, res) => {
  res.status(200).json({
    message: "POST /api/test fonctionne !",
    data: req.body,
  });
});*/

/*app.post('/api/session', async (req, res) => {
  try {
    const { date, openingPrice, status } = req.body;
    const session = new Session({ date, openingPrice, status });
    await session.save();
    res.status(201).send({ message: 'Session créée avec succès', session });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la création de la session', error });
  }
});*/

/*app.put('/api/session/:id', async (req, res) => {
  try {
    const { closingPrice, status } = req.body;
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { closingPrice, status },
      { new: true }
    );
    res.send({ message: 'Session mise à jour avec succès', session });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la mise à jour de la session', error });
  }
});*/
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//app.use('/api/stockTitles', stockTitleRoutes); // Routes pour le stock titre
//app.use('/api/accounts', accountRoutes); // Routes pour les comptes titres
//app.use('/api/orderBooks', orderBook); // Routes pour le stock titre

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));