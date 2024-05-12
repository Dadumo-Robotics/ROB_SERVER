import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css';
import './main.css';
import Header from './pages/Header.jsx';
import Footer from './pages/Footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className='App'>
            <Header />
                <App />
            <Footer />
        </div>
    </React.StrictMode>
)