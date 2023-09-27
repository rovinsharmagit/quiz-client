import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ContextProvider } from './hooks/useStateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography:{
    fontFamily:'"IBM Plex Sans"'
  }
});
root.render(
  <React.StrictMode>
  <ContextProvider>
  <ThemeProvider theme={darkTheme}>
  <CssBaseline/>
    <App />
  </ThemeProvider>
  </ContextProvider>  
  </React.StrictMode>
);

reportWebVitals();
