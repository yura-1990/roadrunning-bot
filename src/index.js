import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { initI18n } from './i18n';
import { TimerProvider } from "./components/timerContext";
initI18n('en');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimerProvider>
      <Router>
        <App />
      </Router>
    </TimerProvider>
  </React.StrictMode>
);
