import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContactContextProvider } from './context/ContactContext';
import App from './main/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContactContextProvider>
      <App />
    </ContactContextProvider>
  </React.StrictMode>
);

