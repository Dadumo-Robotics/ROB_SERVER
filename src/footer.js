import React from 'react';
import './footer.css';
import logo from './logo.svg'; // Importa la imagen de React

function Footer() {
  return (
    <footer className="App-footer">
      <img src={logo} className="Logo-footer" alt="logo" />
      <div className="footer-buttons">
        <button>Solución</button>
        <button>Registro</button>
        <button>Inicio</button>
        <button className='btn-final'>Contáctanos</button>
      </div>
    </footer>
  );
}

export default Footer;