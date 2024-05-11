import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css';
import Header from './pages/Header.jsx';
import Footer from './pages/Footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />
            <App />
        <Footer />
    </React.StrictMode>
)