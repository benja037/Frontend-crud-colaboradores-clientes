import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getClientes, deleteCliente, createCliente, updateCliente, getColaboradores } from '../api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [newCliente, setNewCliente] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    fono: '',
    direccion: '',
    email: '',
    fechaIngreso: '',
    colaboradorId: '',
  });

  useEffect(() => {
    async function fetchData() {
      const clientesData = await getClientes();
      const colaboradoresData = await getColaboradores();
      setClientes(clientesData);
      setColaboradores(colaboradoresData);
    }
    fetchData();
  }, []);

  const handleDelete = async (clienteId) => {
    await deleteCliente(clienteId);
    const data = await getClientes();
    setClientes(data);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCliente(null);
    setNewCliente({
      rut: '',
      nombre: '',
      apellido: '',
      fono: '',
      direccion: '',
      email: '',
      fechaIngreso: '',
      colaboradorId: '',
    });
  };

  const handleChange = (e) => {
    setNewCliente({
      ...newCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    await createCliente(newCliente);
    const data = await getClientes();
    setClientes(data);
    handleClose();
  };

  const handleEditOpen = (cliente) => {
    setEditingCliente(cliente);
    setNewCliente(cliente);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (editingCliente) {
      await updateCliente(editingCliente.clienteId, newCliente);
      const data = await getClientes();
      setClientes(data);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>
        Crear Cliente
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>RUT</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.clienteId}>
                <TableCell>{cliente.clienteId}</TableCell>
                <TableCell>{cliente.rut}</TableCell>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.apellido}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="secondary" onClick={() => handleEditOpen(cliente)}>Editar</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(cliente.clienteId)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCliente ? "Actualizar Cliente" : "Crear Nuevo Cliente"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, {editingCliente ? "actualiza" : "ingresa"} los detalles del cliente.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="rut"
            label="RUT"
            type="text"
            fullWidth
            variant="standard"
            value={newCliente.rut}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={newCliente.nombre}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="apellido"
            label="Apellido"
            type="text"
            fullWidth
            variant="standard"
            value={newCliente.apellido}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fono"
            label="Fono"
            type="text"
            fullWidth
            variant="standard"
            value={newCliente.fono}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="direccion"
            label="Dirección"
            type="text"
            fullWidth
            variant="standard"
            value={newCliente.direccion}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={newCliente.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fechaIngreso"
            label="Fecha de Ingreso"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={newCliente.fechaIngreso.split('T')[0]}  // Formatear la fecha
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel>Colaborador</InputLabel>
            <Select
              name="colaboradorId"
              value={newCliente.colaboradorId}
              onChange={handleChange}
            >
              {colaboradores.map((colaborador) => (
                <MenuItem key={colaborador.colaboradorId} value={colaborador.colaboradorId}>
                  {colaborador.nombre} {colaborador.apellido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
          <Button onClick={editingCliente ? handleUpdate : handleCreate} color="primary">
            {editingCliente ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Clientes;
