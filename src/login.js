import React from 'react';
import logo from './logoDadumo.png';
import './login.css';

function Login() {
  return (
    <div className="app">
      <main className='main'>
        <div className='login-container'>
          <img src={logo} className="logo" alt="logo" />
          <div className='inputs-container'>
            <h2>Inicia sesión</h2>
            <div>
              <label>Correo electrónico</label>
              <input type='email' placeholder='Correo electrónico' />
            </div>
            <div>
              <label>Contraseña</label>
              <input type='password' placeholder='Contraseña' />
            </div>
            <h5>¿No tienes cuenta? Regístrate</h5>
            <button className='btn-login'>Iniciar sesión</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
