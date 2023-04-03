import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
  auth: undefined,
  role: undefined,
  branch: undefined,
  login: () => {},
  logout: () => {},
  orderProducts: undefined,
  addProduct: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState();
  const [role, setRole] = useState();
  const [branch, setBranch] = useState();
  const [orderProducts, setOrderProducts] = useState([]);
  const login = (userData) => {
    setAuth(userData.token);
    setRole(userData.role);
    setBranch(userData.branch);
  };

  const logout = () => {
    setAuth(undefined);
  };

  const addProduct = (item) => {
    if (isOnCart(item.id)) {
      const product = orderProducts.find(function (found) {
        return found.id === item.id;
      });
    } else {
      setOrderProducts([...orderProducts, [item.id]]);
    }
  };

  const isOnCart = (id) => {
    let result = orderProducts.some((item) => item.id === id);
    return result;
  };

  const valueContext = {
    auth,
    role,
    branch,
    login,
    logout,
    orderProducts,
    addProduct,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
