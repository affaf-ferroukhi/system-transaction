import React, { useState , useEffect } from 'react';
import Auth from "./interface/Auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './interface/dashboard/Dashboard';
import LaunchOrder from './interface/dashboard/LaunchOrder';
import "./interface/Global.css";
import AgentSession from './interface/agent/AgentSession';
//import ProtectedRoute from './interface/ProtecteRoute';

const App = () => {
  const isAuthenticated = localStorage.getItem("auth")==="true";
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    console.log("Ordres mis à jour :", orders);
}, [orders]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
    console.log("État mis à jour :", [...orders, order]);
  };

  const rejectOrder = (orderId) => {
  setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
};

  const updateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      )
    );
  };
  const userRole = localStorage.getItem("role");

  return (
    <Router> 
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/LaunchOrder" element={<LaunchOrder addOrder={addOrder} updateOrder={updateOrder} orders={orders} />} />
      <Route path="/dashboard" element={  isAuthenticated && userRole === "Admin" ? (
        <Dashboard orders={orders} rejectOrder={rejectOrder} updateOrder={updateOrder} setOrders={setOrders} />
          ) : (
              <Navigate to="/" replace />
            )} />
         <Route path="/AgentSession" element={ isAuthenticated && userRole === "Agent" ? ( <AgentSession />
  ) : (
    <Navigate to="/" replace />
  )}
/>
    </Routes>
    </Router>
  );
};

export default App;
