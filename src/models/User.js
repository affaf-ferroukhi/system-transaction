const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Agent', 'Admin', 'TCC'], // Liste des rôles possibles
        required: true,
        default: 'Agent', // Rôle par défaut
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;