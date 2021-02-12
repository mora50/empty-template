import React from "react";

// import { Container } from './styles';

import ProtectRoute, { AuthProvider } from "../contexts/authContext";

import { LocationProvider } from "src/contexts/locationContext";
import { CartProvider } from "src/contexts/cartContext";
import { ManagedUIContext } from "src/contexts/modalsContext";

const ContextsProvider: React.FC = ({ children }) => {
  return (
    <ProtectRoute>
      <AuthProvider>
        <CartProvider>
          <LocationProvider>
            <ManagedUIContext> {children} </ManagedUIContext>
          </LocationProvider>
        </CartProvider>
      </AuthProvider>
    </ProtectRoute>
  );
};

export default ContextsProvider;
