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
      const newProducts = orderProducts;
      const currentProduct = newProducts.find(function (found) {
        return found.id === product.id;
      });

      if (currentProduct.unit !== "piece") {
        parseFloat(product.amount) + parseFloat(currentProduct.amount);
      } else {
        currentProduct.amount += 1;
      }
      setOrderProducts([...newProducts]);
    } else {
      setOrderProducts([...orderProducts, { ...product, amount: 1 }]);
    }
  };

  const isOnCart = (id) => {
    const result = orderProducts.some((item) => item.id === id);
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
