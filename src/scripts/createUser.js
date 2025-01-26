const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const connectDB = require("../db");


const createUser = async () => {
    const username = 'admin';
    const password = 'admin123';
    const role = 'Admin';

    try {
        connectDB();

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Utilisateur déjà existant');
            return;
        }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashedPassword,
        role,
    });

    await user.save();
    console.log('Utilisateur créé avec succès');
    mongoose.connection.close();
} catch (err) {
    console.error('Erreur lors de la création de l’utilisateur :', err);
    mongoose.connection.close();
} /*finally {
    mongoose.connection.close();
}*/
};

createUser().catch((err) => {
    console.error('Erreur lors de la création de l’utilisateur :', err);
    //mongoose.connection.close();
});
