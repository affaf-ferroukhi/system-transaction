import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Select, MenuItem } from '@mui/material';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/orders')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFilter = (type) => {
    setFilter(type);
  };

  const filteredOrders = filter
    ? orders.filter((order) => order.type === filter)
    : orders;

  return (
    <>
      <Select value={filter} onChange={(e) => handleFilter(e.target.value)}>
        <MenuItem value="">Tous</MenuItem>
        <MenuItem value="Achat">Achat</MenuItem>
        <MenuItem value="Vente">Vente</MenuItem>
      </Select>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Quantité</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => axios.put(`/api/orders/${order._id}`, { status: 'Validé' })}
                >
                  Valider
                </Button>
                <Button
                  onClick={() => axios.put(`/api/orders/${order._id}`, { status: 'Rejeté' })}
                  color="error"
                >
                  Rejeter
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderTable;
