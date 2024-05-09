import React from 'react';
import './header.css';
import logo from './logo.svg'; // Importa la imagen de React

function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="header-buttons">
        <button className='btn-second'>Solución</button>
        <button className='btn-second'>Registro</button>
        <button className='btn-second'>Inicio</button>
        <button className='btn-main'>Contáctanos</button>
      </div>
    </header>
  );
}

export default Header;