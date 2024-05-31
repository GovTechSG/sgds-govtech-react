import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@webcomponents/scoped-custom-element-registry';
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds/css/sgds.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
