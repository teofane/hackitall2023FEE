import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={createTheme()}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

