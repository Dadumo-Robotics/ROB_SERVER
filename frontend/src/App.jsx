import React from 'react';
import './App.css';
// import Component from './component';
// import Register from './register';
// import Login from './login';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoutes';
import Admin from './pages/Admin';
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import User from './pages/User';

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

/*
function App() {
  return (
    <div className="App">
      <Header /> 
      <main className='main'>
        {/* <Component /> *//*}
        <Register />
      </main>
      <Footer />
    </div>
  );
}
*/

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                  <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<User />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;