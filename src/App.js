import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getClientes, createCliente, updateCliente, deleteCliente, getColaboradores } from './api';
import Clientes from './Components/Clientes';
import Colaboradores from './Components/Colaboradores';
import ClientesDeColaboradores from './Components/ClientesDeColaboradores';
import './App.css';




function Filtros() {
  return <h2>Filtrar Clientes por Colaboradores</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><a href="/clientes">Clientes</a></li>
              <li><a href="/colaboradores">Colaboradores</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
