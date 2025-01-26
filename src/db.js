const mongoose = require("mongoose");
//const bcrypt = require('bcrypt');
const User = require('./models/Order');
//const createAdminUser = require('./scripts/createUser');


const connectDB = async () => {

  try {
   await mongoose.connect("mongodb://localhost:27017/system-transaction", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
    console.log("Connexion à MongoDB réussie");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    process.exit(1); // Quitte le processus en cas d'erreur
  }

  /*app.get('/api/orders', async (req, res) => {
    try {
      const orders = await Order.find(); // Récupère tous les ordres de la collection
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des ordres', error });
    }
  });*/
};
/*async function createAdminUser() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'Admin',
  });

  await user.save();
  console.log('Utilisateur admin créé avec succès');
  mongoose.disconnect();
}*/

module.exports = connectDB;
