import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render( // Renderiza o componente App dentro do root em html //
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);