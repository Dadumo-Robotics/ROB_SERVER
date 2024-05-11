import React from 'react';
import logo from '../multimedia/logoDadumo.png';
import '../styles/Register.css';
import '../App.css';

function Register() {
  return (
    
    <div className="app-register">
      <main className='main-register'>
        <div className='register-container'>
          <img src={logo} className="logo-register" alt="logo" />
          <div className='inputs-container-register'>
            <h2 className='titulo-register'>Registro de usuario</h2>
            <div>
              <label className='label-register'>Nombre y apellidos</label>
              <input type='text' className="input-style-register" placeholder='Nombre y apellidos' />
            </div>
            <div>
              <label className='label-register'>Correo electrónico</label>
              <input type='email' className="input-style-register" placeholder='Correo electrónico' />
            </div>
            <div>
              <label className='label-register'>Contraseña</label>
              <input type='password' className="input-style-register" placeholder='Contraseña' />
            </div>
            <div>
              <label className='label-register'>Reescriba la contraseña</label>
              <input type='password' className="input-style-register" placeholder='Contraseña' />
            </div>            
            <div>
              <label className='label-register'>Id del producto</label>
              <input type='number' className="input-style-register" placeholder='ej. 123456' />
            </div>
            <button className='btn-toLogin'>¿Ya tienes cuenta? Inicia sesión</button>
            <button className='btn-register'>Registrate</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
