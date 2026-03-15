import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogout, setIslogout] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  return (
    <AuthContext.Provider
      value={{ isLogout, setIslogout, user, setUser, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
