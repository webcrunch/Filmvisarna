import './css/style.css';
import './utilities/auto-key-lists';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './Footer';
import Navbar from './Navbar';
ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Navbar />
    <App />
    <Footer />
    
  </React.StrictMode>
);
