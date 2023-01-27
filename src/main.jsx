import './css/style.css';
import './utilities/auto-key-lists';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './Footer';
import Navbar from './Navbar';
import Movies from './Movies';
ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Navbar />
      {/* <App /> */}
      <Movies />
    <Footer />
  </React.StrictMode>
);
