import React from 'react';
import './contacto.css'; // Asegúrate de tener el archivo de estilos CSS
import logo from './logoDadumo.png';

function Contacto() {
  return (
    <div className="app">
      <main className='main'>
        <div className='contacto-container'>
          <img src={logo} className="logo" alt="logo" />
          <div className='contacto-form'>
            <h2>Ficha de Contacto</h2>
            <div>
              <label>Nombre y Apellidos</label>
              <input type='text' placeholder='Nombre y Apellidos' />
            </div>
            <div>
              <label>Email</label>
              <input type='email' placeholder='Correo electrónico' />
            </div>
            <div>
              <label>Teléfono</label>
              <input type='tel' placeholder='Teléfono' />
            </div>
            <div>
              <label>Información Adicional</label>
              <textarea placeholder='Escribe tu consulta aquí...' />
            </div>
            <button className='btn-enviar'>Enviar</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contacto;