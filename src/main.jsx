import './css/style.css';
import './utilities/auto-key-lists';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DetailedInfo from './detailedInfo';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <DetailedInfo />
  </React.StrictMode>
);
