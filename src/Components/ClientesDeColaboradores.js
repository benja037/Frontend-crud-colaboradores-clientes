import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { getColaboradores } from '../api';

function ClientesDeColaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const colaboradoresData = await getColaboradores();
      setColaboradores(colaboradoresData);
    }
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedColaborador(null);
  };

  const handleViewClientes = (colaborador) => {
    setSelectedColaborador(colaborador);
    setOpen(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>RUT</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colaboradores.map((colaborador) => (
              <TableRow key={colaborador.colaboradorId}>
                <TableCell>{colaborador.colaboradorId}</TableCell>
                <TableCell>{colaborador.rut}</TableCell>
                <TableCell>{colaborador.nombre}</TableCell>
                <TableCell>{colaborador.apellido}</TableCell>
                <TableCell>{colaborador.cargo}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleViewClientes(colaborador)}>Ver Clientes</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedColaborador && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Clientes de {selectedColaborador.nombre} {selectedColaborador.apellido}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedColaborador.clientes?.$values && selectedColaborador.clientes.$values.length > 0 ? (
                <ul>
                  {selectedColaborador.clientes.$values.map((cliente) => (
                    <li key={cliente.clienteId}>{cliente.nombre} {cliente.apellido}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay clientes asociados a este colaborador.</p>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default ClientesDeColaboradores;
