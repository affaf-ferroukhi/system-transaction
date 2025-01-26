const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
    console.log("Route /login appelée");
    
    try {
        const username = req.body.username.trim().toLowerCase();
        console.log("Nom d'utilisateur après trim et toLowerCase:", username);
        const password = req.body.password;
        console.log("Requête reçue : ", { username, password });

        const user = await User.findOne({ username });
        console.log("Utilisateur trouvé :", user);

        if (!user) {
            console.log("Aucun utilisateur trouvé pour le nom :", username);
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        console.log("Password from request:", password);
        console.log("Stored hashed password:", user.password);

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordValid);
        
        if (!isPasswordValid) {
            console.log("Réponse envoyée : mot de passe incorrect");
            return res.status(401).json({ message: 'Mot de passe incorrect' });
            
        }
        /*if (user.password !== password) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }*/
        const token = jwt.sign(

            { userId: user._id, role: user.role },
            'secret_key', 
            { expiresIn: '1h' }
        );
        console.log("Token généré avec succès");

        return res.json({
            token:token,
            role: user.role, 
        });
        console.log("Réponse envoyée : connexion réussie");
        //return res.json({ role: user.role, token }); 
    

    } catch (error) {
        console.error("Erreur inattendue capturée :", error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }  
});

module.exports = router;
