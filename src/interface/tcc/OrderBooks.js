import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Box } from '@mui/material';

const OrderBooks = () => {
  const [nonNominalBooks, setNonNominalBooks] = useState([]);
  const [nominalBooks, setNominalBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/orderBooks/non-nominal')
      .then((response) => setNonNominalBooks(response.data))
      .catch((error) => console.error(error));

    axios.get('/api/orderBooks/nominal')
      .then((response) => setNominalBooks(response.data))
      .catch((error) => console.error(error));
  }, []);

  /*return (
    
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">Carnets d'ordres</Typography>

      <Typography variant="h6" mt={2}>Carnets d'ordres non nominatifs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre d'ordres</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell>Utilisateur</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nonNominalBooks.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book._id}</TableCell>
              <TableCell>{book.orders.length}</TableCell>
              <TableCell>{new Date(book.createdAt).toLocaleString()}</TableCell>
              <TableCell>{book.userModified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" mt={4}>Carnets d'ordres nominatifs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Nombre d'ordres</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell>Utilisateur</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nominalBooks.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book._id}</TableCell>
              <TableCell>{book.clientId}</TableCell>
              <TableCell>{book.orders.length}</TableCell>
              <TableCell>{new Date(book.createdAt).toLocaleString()}</TableCell>
              <TableCell>{book.userModified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );*/
};

export default OrderBooks;
