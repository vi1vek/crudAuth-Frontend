import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogout, setIslogout] = useState(false);
  return (
    <AuthContext.Provider value={{ isLogout, setIslogout }}>
      {children}
    </AuthContext.Provider>
  );
};
