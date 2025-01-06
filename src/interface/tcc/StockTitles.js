import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, TextField } from '@mui/material';

const StockTitles = () => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [newTitle, setNewTitle] = useState({
    titleCode: '',
    titleLabel: '',
    circulationDate: '',
    userModified: '',
  });

  useEffect(() => {
    axios.get('/api/stockTitles')
      .then((response) => setTitles(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreate = () => {
    axios.post('/api/stockTitles', newTitle)
      .then((response) => {
        setTitles([...titles, response.data]);
        setNewTitle({ titleCode: '', titleLabel: '', circulationDate: '', userModified: '' });
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (id) => {
    axios.put(`/api/stockTitles/${id}`, selectedTitle)
      .then((response) => {
        setTitles(titles.map((title) => (title._id === id ? response.data : title)));
        setSelectedTitle(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/stockTitles/${id}`)
      .then(() => setTitles(titles.filter((title) => title._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>Gestion des stocks titres</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Libellé</TableCell>
            <TableCell>Date de circulation</TableCell>
            <TableCell>Date de modification</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {titles.map((title) => (
            <TableRow key={title._id}>
              <TableCell>{title.titleCode}</TableCell>
              <TableCell>{title.titleLabel}</TableCell>
              <TableCell>{new Date(title.circulationDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(title.lastModifiedDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedTitle(title)}>Modifier</Button>
                <Button color="error" onClick={() => handleDelete(title._id)}>Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedTitle && (
        <Box mt={2}>
          <Typography variant="h6">Modifier le titre</Typography>
          <TextField
            label="Libellé"
            value={selectedTitle.titleLabel}
            onChange={(e) => setSelectedTitle({ ...selectedTitle, titleLabel: e.target.value })}
            fullWidth
          />
          <TextField
            label="Date de circulation"
            type="date"
            value={selectedTitle.circulationDate}
            onChange={(e) => setSelectedTitle({ ...selectedTitle, circulationDate: e.target.value })}
            fullWidth
          />
          <Button onClick={() => handleUpdate(selectedTitle._id)}>Sauvegarder</Button>
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h6">Créer un nouveau titre</Typography>
        <TextField
          label="Code"
          value={newTitle.titleCode}
          onChange={(e) => setNewTitle({ ...newTitle, titleCode: e.target.value })}
          fullWidth
        />
        <TextField
          label="Libellé"
          value={newTitle.titleLabel}
          onChange={(e) => setNewTitle({ ...newTitle, titleLabel: e.target.value })}
          fullWidth
        />
        <TextField
          label="Date de circulation"
          type="date"
          value={newTitle.circulationDate}
          onChange={(e) => setNewTitle({ ...newTitle, circulationDate: e.target.value })}
          fullWidth
        />
        <TextField
          label="Utilisateur"
          value={newTitle.userModified}
          onChange={(e) => setNewTitle({ ...newTitle, userModified: e.target.value })}
          fullWidth
        />
        <Button onClick={handleCreate}>Créer</Button>
      </Box>
    </Box>
  );
};

export default StockTitles;
