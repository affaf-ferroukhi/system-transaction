const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('.Order./models/User');
const connectDB = require("../db");

const createAgent = async () => {
    const username = 'agent001';
    const password = await bcrypt.hash('agent123', 10);
    const role = 'Agent';

    try {
        connectDB();

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Utilisateur déjà existant');
            return;
        }


    await User.create({ username, password, role });
    console.log('Utilisateur agent001 créé avec succès.');
        mongoose.connection.close();
    } catch (err) {
        console.error('Erreur lors de la création de l’utilisateur :', err);
        mongoose.connection.close();
    }
};
createAgent().catch((err) => {
    console.error('Erreur lors de la création de l’utilisateur :', err);
    //mongoose.connection.close();
});

