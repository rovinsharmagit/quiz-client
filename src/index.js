import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
root.render(
  <React.StrictMode>
  <ThemeProvider theme={darkTheme}>
  <CssBaseline/>
    <App />
  </ThemeProvider>  
  </React.StrictMode>
);

reportWebVitals();
