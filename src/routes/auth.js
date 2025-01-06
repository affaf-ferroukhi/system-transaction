const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Requête reçue : ", { username, password });

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Génération d'un token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            'secret_key', // Remplacez par une clé secrète plus sécurisée
            { expiresIn: '1h' }
        );

        res.json({
            token,
            role: user.role, // Renvoie le rôle
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l’authentification' });
    }
});

module.exports = router;
