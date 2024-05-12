import React from 'react';
import './App.css';
// import Component from './component';
// import Register from './register';
// import Login from './login';

import ProtectedRoute from './components/ProtectedRoutes';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Movement from './pages/Movement';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
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
            path="/home"
            element={
              <ProtectedRoute>
                  <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='/movement' element={<Movement />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<User />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;