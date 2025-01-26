const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const connectDB = require("../db");

const createTcc = async () => {
    const username = 'tcc001';
    const password = await bcrypt.hash('tcc123', 10);
    const role = 'TCC';

    try {
        connectDB();

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Utilisateur déjà existant');
            return;
        }


    await User.create({ username, password, role });
    console.log('Utilisateur tcc001 créé avec succès.');
        mongoose.connection.close();
    } catch (err) {
        console.error('Erreur lors de la création de l’utilisateur :', err);
        mongoose.connection.close();
    }
};
createTcc().catch((err) => {
    console.error('Erreur lors de la création de l’utilisateur :', err);
    //mongoose.connection.close();
});

