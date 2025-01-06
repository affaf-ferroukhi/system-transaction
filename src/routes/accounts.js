const express = require('express');
const Account = require('../models/Account');

const router = express.Router();

// Récupérer les comptes titres
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des comptes titres.' });
  }
});

// Créer un nouveau compte titre
router.post('/', async (req, res) => {
  const { clientId, number, titleCode, userModified } = req.body;
  try {
    const account = new Account({ clientId, number, titleCode, userModified });
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du compte titre.' });
  }
});

module.exports = router;
