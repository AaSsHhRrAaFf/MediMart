// src/Providers/AppProviders.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../Context/AuthContext';
import { CartProvider } from '../Context/CartContext';
import { RouterProvider } from 'react-router-dom';
import router from '../Routes/Route';

const queryClient = new QueryClient();

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
              <RouterProvider router={router} >
                {children}
              </RouterProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
