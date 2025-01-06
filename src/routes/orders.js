const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Modèle Mongoose
const verifyRole = require('../middlewares/authMiddleware');

// Route accessible uniquement par les agents
router.post('/create', verifyRole('Agent'), (req, res) => {
  res.send('Création d’un ordre');
});

// Route accessible uniquement par les admins
router.get('/admin', verifyRole('Admin'), (req, res) => {
  res.send('Gestion des utilisateurs');
});

// Route accessible uniquement par les TCC
router.get('/tcc', verifyRole('TCC'), (req, res) => {
  res.send('Consultation des ordres');
});


// POST : Ajouter un ordre
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'ordre :", err.message);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'ordre" });
  }
});

// GET : Récupérer tous les ordres
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("Erreur lors de la récupération des ordres :", err.message);
    res.status(500).json({ message: "Erreur lors de la récupération des ordres" });
  }
});

module.exports = router;
