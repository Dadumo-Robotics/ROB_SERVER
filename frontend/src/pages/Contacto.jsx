import React from 'react';
import '../styles/Contacto.css'; // Asegúrate de tener el archivo de estilos CSS

function Contacto() {
  return (
    <div className="app-contacto">
      <main className='main-contacto'>
        <div className='contacto-container'>
          <h2 className='titulo-contacto'>Ficha de Contacto</h2>
          <div>
            <label className='label-contacto'>Nombre y Apellidos</label>
            <input type='text' className="input-style-contacto" placeholder='Nombre y Apellidos' />
          </div>
          <div>
            <label className='label-contacto'>Email</label>
            <input type='email' className="input-style-contacto" placeholder='Correo electrónico' />
          </div>
          <div>
            <label className='label-contacto'>Teléfono</label>
            <input type='number' className="input-style-contacto" placeholder='Teléfono' />
          </div>
          <div>
            <label className='label-contacto'>Información Adicional</label>
            <textarea className="textarea-style-contacto" placeholder='Escribe tu consulta aquí...' />
          </div>
          <button className='btn-enviar'>Enviar</button>
        </div>
      </main>
    </div>
  );
}

export default Contacto;