const express = require('express');
const StockTitle = require('../models/StockTitle');

const router = express.Router();

// Créer un nouveau titre
router.post('/', async (req, res) => {
  const { titleCode, titleLabel, circulationDate, userModified } = req.body;
  try {
    const stockTitle = new StockTitle({
      titleCode,
      titleLabel,
      circulationDate,
      userModified,
    });
    await stockTitle.save();
    res.status(201).json(stockTitle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du stock titre.' });
  }
});

// Récupérer tous les titres
router.get('/', async (req, res) => {
  try {
    const stockTitles = await StockTitle.find();
    res.json(stockTitles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des stocks titres.' });
  }
});

// Mettre à jour un titre
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titleLabel, circulationDate, userModified } = req.body;
  try {
    const stockTitle = await StockTitle.findByIdAndUpdate(
      id,
      { titleLabel, circulationDate, userModified, lastModifiedDate: Date.now() },
      { new: true }
    );
    if (!stockTitle) {
      return res.status(404).json({ message: 'Titre non trouvé.' });
    }
    res.json(stockTitle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du titre.' });
  }
});

// Supprimer un titre
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const stockTitle = await StockTitle.findByIdAndDelete(id);
    if (!stockTitle) {
      return res.status(404).json({ message: 'Titre non trouvé.' });
    }
    res.json({ message: 'Titre supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du titre.' });
  }
});

module.exports = router;
