import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/Register';
import Movement from './pages/Movement';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import User from './pages/User';

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='main'>
        <Routes>
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          /> 
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute> 
            }    
          />
           <Route 
            path='/movement' 
            element={
              <ProtectedRoute>
                <Movement />
              </ProtectedRoute>
            }    
          />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
