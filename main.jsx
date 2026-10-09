import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { resolveRoute } from './routes.js';
import './styles.css';

const rootElement = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App route={resolveRoute(window.location.pathname)} />
  </React.StrictMode>
);

if (rootElement.querySelector('header')) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
