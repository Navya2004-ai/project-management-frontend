import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // You can style globally here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
