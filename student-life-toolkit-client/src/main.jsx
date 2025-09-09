import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import CardsProvider from './Providers/CardsProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CardsProvider>
      <RouterProvider router={router} />
      </CardsProvider>
    </AuthProvider>
  </StrictMode>,
)
