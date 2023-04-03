import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
  auth: undefined,
  role: undefined,
  branch: undefined,
  login: () => {},
  logout: () => {},
  orderProducts: [],
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

  const addProduct = (product) => {
    if (isOnCart(product.id)) {
      const productOnCart = orderProducts.findIndex((item) => item.id === 2);
    } else {
      setOrderProducts([
        ...orderProducts,
        { id: product.id, amount: 1, price: product.price },
      ]);
    }
  };

  const isOnCart = (id) => {
    const result = Object.values(orderProducts).includes(id);
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
