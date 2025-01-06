import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import AccountManagement from '../components/AccountManagement';

const TCCDashboard = () => {
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
