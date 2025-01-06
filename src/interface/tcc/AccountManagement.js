import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Box, TextField } from '@mui/material';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    axios.get('/api/accounts')
      .then((response) => setAccounts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleUpdate = (id, updatedData) => {
    axios.put(`/api/accounts/${id}`, updatedData)
      .then(() => {
        setAccounts((prev) => prev.map((acc) => (acc._id === id ? { ...acc, ...updatedData } : acc)));
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>Gestion des comptes titres</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Numéro</TableCell>
            <TableCell>Code Titre</TableCell>
            <TableCell>Solde</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account._id}>
              <TableCell>{account._id}</TableCell>
              <TableCell>{account.number}</TableCell>
              <TableCell>{account.titleCode}</TableCell>
              <TableCell>{account.balance}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedAccount(account)}>Modifier</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedAccount && (
        <Box mt={4}>
          <Typography variant="h6">Modifier le compte</Typography>
          <TextField
            label="Solde"
            value={selectedAccount.balance}
            onChange={(e) => setSelectedAccount({ ...selectedAccount, balance: e.target.value })}
          />
          <Button
            onClick={() => handleUpdate(selectedAccount._id, { balance: selectedAccount.balance })}
          >
            Sauvegarder
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AccountManagement;
