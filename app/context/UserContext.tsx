"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Definimos el tipo de usuario
interface User {
  id: string;
  email: string;
  username: string;
}

// Definimos el tipo del contexto
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Creamos el contexto con valores iniciales
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook para acceder al contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro de un UserProvider");
  }
  return context;
};

// Proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
