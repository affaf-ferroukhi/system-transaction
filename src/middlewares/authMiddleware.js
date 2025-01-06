const jwt = require('jsonwebtoken');

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, 'secret_key'); // Utilisez la même clé secrète
            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
            req.user = decoded; // Stocke les infos utilisateur pour usage ultérieur
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Token invalide' });
        }
    };
};

module.exports = verifyRole;
