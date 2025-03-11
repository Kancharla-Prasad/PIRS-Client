import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Ensure this file exists and has styles
import App from './App.jsx'; // Your App component
import { BrowserRouter } from 'react-router-dom'; // For routing
import { AppProvider } from './context/AppContext.jsx';

// Create the root element and render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <BrowserRouter>
      {/* Wrap your app with the context provider to allow access to context */}
        <App />
    </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
