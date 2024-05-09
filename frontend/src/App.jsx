import React from 'react';
import './App.css';
import Header from './header'; // Importa el componente Header
import Footer from './footer'; // Importa el componente Footer
// import Component from './component';
import Register from './register';
import Login from './login';
import VideoSection from './video_section'

function App() {
  return (
    <div className="App">
      <Header /> 
      <main className='main'>
        {/* <Component /> */}
        <Register />
      </main>
      <Footer />
    </div>
  );
}

export default App;