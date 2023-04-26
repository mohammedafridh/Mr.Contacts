import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContactContextProvider } from './context/ContactContext';
import { AuthContextProvider } from './context/UserContext';
import App from './main/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContactContextProvider>
        <App />
      </ContactContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

