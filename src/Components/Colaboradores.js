import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { getColaboradores, updateColaborador, deleteColaborador, createColaborador, updateCliente } from '../api';

function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [editingColaborador, setEditingColaborador] = useState(null);
  const [editingCliente, setEditingCliente] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newColaborador, setNewColaborador] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    cargo: '',
  });

  const [editingClienteData, setEditingClienteData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    fono: '',
    direccion: '',
    email: '',
    fechaIngreso: '',
  });

  useEffect(() => {
    async function fetchData() {
      const colaboradoresData = await getColaboradores();
      setColaboradores(colaboradoresData);
    }
    fetchData();
  }, []);

  const handleViewClientes = (colaborador) => {
    setSelectedColaborador(colaborador);
    setClientes(colaborador.clientes?.$values || []);
  };

  const handleEditColaboradorOpen = (colaborador) => {
    setEditingColaborador(colaborador);
    setOpenEditDialog(true);
  };

  const handleEditClienteOpen = (cliente) => {
    setEditingCliente(cliente);
    setEditingClienteData(cliente);
    setOpenEditDialog(true);
  };

  const handleCreateColaboradorOpen = () => {
    setOpenCreateDialog(true);
  };

  const handleEditDialogClose = () => {
    setEditingColaborador(null);
    setEditingCliente(null);
    setOpenEditDialog(false);
  };

  const handleCreateColaboradorClose = () => {
    setOpenCreateDialog(false);
    setNewColaborador({
      rut: '',
      nombre: '',
      apellido: '',
      cargo: '',
    });
  };

  const handleUpdateColaborador = async () => {
    if (editingColaborador) {
      await updateColaborador(editingColaborador.colaboradorId, editingColaborador);
      setColaboradores(colaboradores.map(c => c.colaboradorId === editingColaborador.colaboradorId ? editingColaborador : c));
      handleEditDialogClose();
    }
  };

  const handleUpdateCliente = async () => {
    if (editingCliente) {
      await updateCliente(editingCliente.clienteId, editingClienteData);
      setClientes(clientes.map(c => c.clienteId === editingCliente.clienteId ? editingClienteData : c));
      handleEditDialogClose();
    }
  };

  const handleCreateColaborador = async () => {
    const colaboradorCreado = await createColaborador(newColaborador);
    setColaboradores([...colaboradores, colaboradorCreado]);
    handleCreateColaboradorClose();
  };

  const handleColaboradorChange = (e) => {
    const { name, value } = e.target;
    if (editingColaborador) {
      setEditingColaborador({
        ...editingColaborador,
        [name]: value,
      });
    } else {
      setNewColaborador({
        ...newColaborador,
        [name]: value,
      });
    }
  };

  const handleClienteChange = (e) => {
    const { name, value } = e.target;
    setEditingClienteData({
      ...editingClienteData,
      [name]: value,
    });
  };

  const handleDeleteColaborador = async (colaboradorId) => {
    await deleteColaborador(colaboradorId);
    setColaboradores(colaboradores.filter(c => c.colaboradorId !== colaboradorId));
    if (selectedColaborador?.colaboradorId === colaboradorId) {
      setSelectedColaborador(null);
      setClientes([]);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateColaboradorOpen} style={{ marginBottom: '20px' }}>
        Crear Colaborador
      </Button>
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
                  <Button variant="contained" color="secondary" onClick={() => handleEditColaboradorOpen(colaborador)}>Actualizar</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteColaborador(colaborador.colaboradorId)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedColaborador && (
        <div style={{ marginTop: '20px' }}>
          <h3>Clientes de {selectedColaborador.nombre} {selectedColaborador.apellido}</h3>
          <TableContainer component={Paper} style={{ marginTop: '10px', backgroundColor: '#f0f0f0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="cliente table">
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
                      <Button variant="contained" color="primary" onClick={() => handleEditClienteOpen(cliente)}>Editar</Button>
                      <Button variant="contained" color="error" onClick={() => handleDeleteColaborador(cliente.clienteId)}>Eliminar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {(editingColaborador || editingCliente) && (
        <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
          <DialogTitle>{editingColaborador ? "Editar Colaborador" : "Editar Cliente"}</DialogTitle>
          <DialogContent>
            {editingColaborador ? (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  name="rut"
                  label="RUT"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingColaborador.rut}
                  onChange={handleColaboradorChange}
                />
                <TextField
                  margin="dense"
                  name="nombre"
                  label="Nombre"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingColaborador.nombre}
                  onChange={handleColaboradorChange}
                />
                <TextField
                  margin="dense"
                  name="apellido"
                  label="Apellido"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingColaborador.apellido}
                  onChange={handleColaboradorChange}
                />
                <TextField
                  margin="dense"
                  name="cargo"
                  label="Cargo"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingColaborador.cargo}
                  onChange={handleColaboradorChange}
                />
              </>
            ) : (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  name="rut"
                  label="RUT"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingClienteData.rut}
                  onChange={handleClienteChange}
                />
                <TextField
                  margin="dense"
                  name="nombre"
                  label="Nombre"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingClienteData.nombre}
                  onChange={handleClienteChange}
                />
                <TextField
                  margin="dense"
                  name="apellido"
                  label="Apellido"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingClienteData.apellido}
                  onChange={handleClienteChange}
                />
                <TextField
                  margin="dense"
                  name="fono"
                  label="Fono"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingClienteData.fono}
                  onChange={handleClienteChange}
                />
                <TextField
                  margin="dense"
                  name="direccion"
                  label="Dirección"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingClienteData.direccion}
                  onChange={handleClienteChange}
                />
                <TextField
                  margin="dense"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={editingClienteData.email}
                  onChange={handleClienteChange}
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
                  value={editingClienteData.fechaIngreso.split('T')[0]}  // Formatear la fecha
                  onChange={handleClienteChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="secondary">Cancelar</Button>
            <Button onClick={editingColaborador ? handleUpdateColaborador : handleUpdateCliente} color="primary">
              {editingColaborador ? "Actualizar Colaborador" : "Actualizar Cliente"}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={openCreateDialog} onClose={handleCreateColaboradorClose}>
        <DialogTitle>Crear Nuevo Colaborador</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa los detalles del nuevo colaborador.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="rut"
            label="RUT"
            type="text"
            fullWidth
            variant="standard"
            value={newColaborador.rut}
            onChange={handleColaboradorChange}
          />
          <TextField
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={newColaborador.nombre}
            onChange={handleColaboradorChange}
          />
          <TextField
            margin="dense"
            name="apellido"
            label="Apellido"
            type="text"
            fullWidth
            variant="standard"
            value={newColaborador.apellido}
            onChange={handleColaboradorChange}
          />
          <TextField
            margin="dense"
            name="cargo"
            label="Cargo"
            type="text"
            fullWidth
            variant="standard"
            value={newColaborador.cargo}
            onChange={handleColaboradorChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateColaboradorClose} color="secondary">Cancelar</Button>
          <Button onClick={handleCreateColaborador} color="primary">Crear</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Colaboradores;
