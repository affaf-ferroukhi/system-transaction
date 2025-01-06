import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";

const SubscriptionModal = ({ existingOrder, onClose, onValidate }) => {
  return (
    <Dialog open={!!existingOrder} onClose={onClose}>
      <DialogTitle>Souscription en Instance</DialogTitle>
      <DialogContent>
        {existingOrder ? (
          <>
            <Typography variant="body1" gutterBottom>
              Ce client a une souscription en instance :
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Numéro de l'Ordre</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{existingOrder.orderId}</TableCell>
                  <TableCell>{existingOrder.firstName}</TableCell>
                  <TableCell>{existingOrder.lastName}</TableCell>
                  <TableCell>{existingOrder.status || "En Instance"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onValidate(existingOrder)}
                    >
                      Valider
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : (
          <Typography variant="body1">Aucune souscription en instance.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionModal;
