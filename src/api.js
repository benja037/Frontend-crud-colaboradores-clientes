export const getClientes = async () => {
    try {
      const response = await fetch('http://localhost:5231/api/Clientes');
      if (!response.ok) {
        throw new Error('Error al obtener los clientes');
      }
      const data = await response.json();
      return data.$values || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const createCliente = async (cliente) => {
    try {
      const response = await fetch('http://localhost:5231/api/Clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
      if (!response.ok) {
        throw new Error('Error al crear el cliente');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateCliente = async (clienteId, cliente) => {
    try {
      const response = await fetch(`http://localhost:5231/api/Clientes/${clienteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el cliente');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteCliente = async (clienteId) => {
    try {
      const response = await fetch(`http://localhost:5231/api/Clientes/${clienteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  export const getColaboradores = async () => {
    try {
      const response = await fetch('http://localhost:5231/api/Colaboradores');
      if (!response.ok) {
        throw new Error('Error al obtener los colaboradores');
      }
      const data = await response.json();
      return data.$values || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const createColaborador = async (colaborador) => {
    try {
      const response = await fetch('http://localhost:5231/api/Colaboradores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colaborador),
      });
      if (!response.ok) {
        throw new Error('Error al crear el colaborador');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateColaborador = async (colaboradorId, colaborador) => {
    try {
      const response = await fetch(`http://localhost:5231/api/Colaboradores/${colaboradorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colaborador),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el colaborador');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteColaborador = async (colaboradorId) => {
    try {
      const response = await fetch(`http://localhost:5231/api/Colaboradores/${colaboradorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el colaborador');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  