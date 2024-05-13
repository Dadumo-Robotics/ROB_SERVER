import React from 'react';
import logo from '../multimedia/logoDadumo.png';
import '../styles/Register.css';
import '../App.css';

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";


function Register() {

  const route="/api/user/register/"

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
      e.preventDefault();
        try {
          const user = email
          const res = await api.post(route, { "username": user, "first_name": name, "last_name":surname, "email":email, "password":password })
          navigate("/login")

      } catch (error) {
          alert(error)
      }
   };  



  return (
    
    <div className="app-register">
      <main className='main-register'>
        <div className='register-container'>
          <img src={logo} className="logo-register" alt="logo" />
          <form onSubmit={handleSubmit} className='inputs-container-register'>
            <h2 className='titulo-register'>Registro de usuario</h2>
            <div>
              <label className='label-register'>Nombre</label>
              <input type='text' className="input-style-register" placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
              <label className='label-register'>Apellidos</label>
              <input type='text' className="input-style-register" placeholder='Apellidos' value={surname} onChange={(e) => setSurname(e.target.value)}/>
            </div>
            <div>
              <label className='label-register'>Correo electrónico</label>
              <input type='email' className="input-style-register" placeholder='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label className='label-register'>Contraseña</label>
              <input type='password' className="input-style-register" placeholder='Contraseña'/>
            </div>
            <div>
              <label className='label-register'>Reescriba la contraseña</label>
              <input type='password' className="input-style-register" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>         
            <a href='./login' className='btn-toLogin'>¿Ya tienes cuenta? Inicia sesión</a>
            <button className='btn-register' type='submit'>Registrate</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Register;
