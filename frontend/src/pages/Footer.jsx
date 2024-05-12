import React from 'react';
import '../styles/Footer.css';
import logo from '../multimedia/logoDadumo.png'; // Importa la imagen de React

function Footer() {
  return (
    <footer className="App-footer">
      <img src={logo} href='./' className="Logo-footer" alt="logo" />
      <div className="footer-buttons">
        <a href='./'>Inicio</a>
        <a href='./register'>Registro</a>
        <a href='./contacto' className='btn-final'>Contáctanos</a>
      </div>
    </footer>
  );
}

export default Footer;