import React from 'react';
import logo from '../multimedia/logoDadumo.png';
import '../styles/Login.css';

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login() {
  const route="/api/token/"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
      e.preventDefault();
        try {
          const res = await api.post(route, { "email": email, "password":password })
          console.log(res.data.access)
          console.log(res.data.refresh)
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          navigate("/user")
        } catch (error) {
            alert(error)
        }
   };  

  return (
    <div className="app-login">
      <main className='main-login'>
        <div className='login-container'>
          <img src={logo} className="logo-login" alt="logo" />
          <form onSubmit={handleSubmit} className='inputs-container-login'>
            <h2 className='titulo-login'>Inicia sesión</h2>
            <div>
              <label className='label-login'>Correo electrónico</label>
              <input type='email' className="input-style-login" placeholder='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label className='label-login'>Contraseña</label>
              <input type='password' className="input-style-login" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <a href='./register' className='btn-toRegister'>¿No tienes cuenta? Regístrate</a>
            <button className='btn-login'  type='submit'>Iniciar sesión</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
