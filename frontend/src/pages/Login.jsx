import React from 'react';
import logo from '../multimedia/logoDadumo.png';
import '../styles/Login.css';
import Header from './Header'; // Importa el componente Header

function Login() {
  return (
    <div>
    <Header />
    <div className="app-login">
      <main className='main-login'>
        <div className='login-container'>
          <img src={logo} className="logo-login" alt="logo" />
          <div className='inputs-container-login'>
            <h2 className='titulo-login'>Inicia sesión</h2>
            <div>
              <label className='label-login'>Correo electrónico</label>
              <input type='email' className="input-style-login" placeholder='Correo electrónico' />
            </div>
            <div>
              <label className='label-login'>Contraseña</label>
              <input type='password' className="input-style-login" placeholder='Contraseña' />
            </div>
            <button className='btn-toRegister'>¿No tienes cuenta? Regístrate</button>
            <button className='btn-login'>Iniciar sesión</button>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}

export default Login;
