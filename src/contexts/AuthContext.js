import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  user: undefined,
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const valueContext = {
    auth,
    login,
    logout,
  };

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(undefined);
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
