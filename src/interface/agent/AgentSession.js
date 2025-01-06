// AgentSession.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const AgentSession = () => {
  const [sessionData, setSessionData] = useState({
    date: '',
    openingPrice: '',
    closingPrice: '',
    status: 'open',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleCreateSession = async () => {
    try {
      const response = await axios.post('/api/session', sessionData);
      alert('Session créée avec succès : ' + JSON.stringify(response.data.session));
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la création de la session');
    }
  };

  const handleCloseSession = async () => {
    try {
      const response = await axios.put(`/api/session/${sessionData.id}`, {
        closingPrice: sessionData.closingPrice,
        status: 'closed',
      });
      alert('Session clôturée avec succès : ' + JSON.stringify(response.data.session));
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la clôture de la session');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={2}>Gestion de la session</Typography>
      <TextField
        label="Date"
        name="date"
        type="date"
        fullWidth
        value={sessionData.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Cours d'ouverture"
        name="openingPrice"
        type="number"
        fullWidth
        value={sessionData.openingPrice}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Cours de clôture"
        name="closingPrice"
        type="number"
        fullWidth
        value={sessionData.closingPrice}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreateSession}>
          Ouvrir la journée
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCloseSession}>
          Clôturer la journée
        </Button>
      </Box>
    </Box>
  );
};

export default AgentSession;
