import React from 'react';
import logo from '../multimedia/logoDadumo.png';
import '../styles/Register.css';

function Login() {
  return (
    <div className="app">
      <main className='main'>
        <div className='register-container'>
          <img src={logo} className="logo" alt="logo" />
          <div className='inputs-container'>
            <h2>Registro de usuario</h2>
            <div>
              <label>Nombre y apellidos</label>
              <input type='text' placeholder='Nombre y apellidos' />
            </div>
            <div>
              <label>Correo electrónico</label>
              <input type='email' placeholder='Correo electrónico' />
            </div>
            <div>
              <label>Contraseña</label>
              <input type='password' placeholder='Contraseña' />
            </div>
            <div>
              <label>Reescriba la contraseña</label>
              <input type='password' placeholder='Contraseña' />
            </div>            
            <div>
              <label>Id del producto</label>
              <input type='number' placeholder='ej. 123456' />
            </div>
            <button className='btn-toLogin'>¿Ya tienes cuenta? Inicia sesión</button>
            <button className='btn-register'>Iniciar sesión</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
