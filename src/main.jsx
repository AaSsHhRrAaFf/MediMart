// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';
import router from './Routes/Route';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './Context/CartContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
             <QueryClientProvider client={queryClient}>
                 <AuthProvider>
                     <CartProvider>
                          <RouterProvider router={router} />
                     </CartProvider>
                  </AuthProvider>
              </QueryClientProvider>
        </HelmetProvider>
    </StrictMode>
);
