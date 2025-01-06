const express = require('express');
const NonNominalOrderBook = require('../models/NonNominalOrderBook');
const NominalOrderBook = require('../models/NominalOrderBook');
const Order = require('../models/Order');

const router = express.Router();

// Créer un carnet d'ordres non nominatifs
router.post('/non-nominal', async (req, res) => {
  const { orders, userModified } = req.body;
  try {
    const orderBook = new NonNominalOrderBook({ orders, userModified });
    await orderBook.save();
    res.status(201).json(orderBook);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du carnet d’ordres non nominatifs.' });
  }
});

// Créer un carnet d'ordres nominatifs
router.post('/nominal', async (req, res) => {
  const { clientId, orders, userModified } = req.body;
  try {
    const orderBook = new NominalOrderBook({ clientId, orders, userModified });
    await orderBook.save();
    res.status(201).json(orderBook);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du carnet d’ordres nominatifs.' });
  }
});

// Récupérer les carnets d'ordres non nominatifs
router.get('/non-nominal', async (req, res) => {
  try {
    const orderBooks = await NonNominalOrderBook.find().populate('orders');
    res.json(orderBooks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des carnets d’ordres non nominatifs.' });
  }
});

// Récupérer les carnets d'ordres nominatifs
router.get('/nominal', async (req, res) => {
  try {
    const orderBooks = await NominalOrderBook.find().populate('orders clientId');
    res.json(orderBooks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des carnets d’ordres nominatifs.' });
  }
});

module.exports = router;
