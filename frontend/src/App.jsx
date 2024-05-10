import React from 'react';
import './App.css';
import Header from './header'; // Importa el componente Header
import Footer from './footer'; // Importa el componente Footer
// import Component from './component';
import Register from './register';
import Login from './login';
import VideoSection from './video_section'

import {BrowserRouter, Routes, Route, Navigation} from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoutes';

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
    <>
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

        </Routes>

        
      </BrowserRouter>
    </>
  );
}


export default App;