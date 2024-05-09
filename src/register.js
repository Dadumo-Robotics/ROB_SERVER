import React from 'react';
import logo from './logoDadumo.png'; // Importa la imagen de React
import './login.css';

function Register() {
  return (
    <div className="App">
      <main className='main'>
        <div className='Columnas-login'>
            <img src={logo} className="Logo-login" alt="logo" />
            <div className='Inputs-texto'>
                <h2>Inicia sesión</h2>
                <div>
                    <p>Nombre y apellidos</p>
                    <input type='text' placeholder='Nombre' />
                </div>
                <div>
                    <p>Correo electrónico</p>
                    <input type='email' placeholder='Correo electrónico' />
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type='password' placeholder='Contraseña' />
                </div>
                <h5>¿No tienes cuenta? Registrate</h5>
                <button className='btn-login'>Iniciar sesión</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
