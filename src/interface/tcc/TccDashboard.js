import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import AccountManagement from '../components/AccountManagement';

const TCCDashboard = () => {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orderBooks");
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/orders" element={<OrderTable />} />
        <Route path="/accounts" element={<AccountManagement />} />
      </Routes>
    </Router>
  );
};

export default TCCDashboard;
