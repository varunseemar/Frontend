import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes.jsx'
import './styles/index.css'
import { ScreenSizeProvider } from "./ScreenSize.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScreenSizeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ScreenSizeProvider>
  </StrictMode>,
)
