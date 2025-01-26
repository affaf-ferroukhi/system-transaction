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
        enum: ['Agent', 'Admin', 'TCC'], 
        required: true, 
    },
});

userSchema.pre('save', function(next) {
    // Optionnel : validation supplémentaire avant de sauvegarder
    if (!['Admin', 'Agent', 'TCC'].includes(this.role)) {
      return next(new Error('Le rôle est invalide.'));
    }
    next();
  });

const User = mongoose.model('User', userSchema);
module.exports = User;