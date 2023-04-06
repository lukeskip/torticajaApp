import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
  auth: undefined,
  role: undefined,
  branch: undefined,
  cartTotal: 0,
  login: () => {},
  logout: () => {},
  orderProducts: [],
  addProduct: () => {},
  isOpen: undefined,
  setProductModal: () => {},
  productModal: undefined,
  setIsOpen: () => {},
  emptyCart: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState();
  const [role, setRole] = useState();
  const [branch, setBranch] = useState();
  const [orderProducts, setOrderProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);

  const login = (userData) => {
    setAuth(userData.token);
    setRole(userData.role);
    setBranch(userData.branch);
  };

  const logout = () => {
    setAuth(undefined);
  };

  const addProduct = (product, amount = 0) => {
    if (isOnCart(product.id)) {
      const newProducts = orderProducts;
      const currentProduct = newProducts.find(function (found) {
        return found.id === product.id;
      });

      if (currentProduct.unit !== "piece") {
        openModal(product);
        currentProduct.amount =
          parseFloat(amount) + parseFloat(currentProduct.amount);
        if (amount > 0) {
          setOrderProducts([...newProducts]);
        }
      } else {
        currentProduct.amount += 1;
        setOrderProducts([...newProducts]);
      }
    } else {
      if (product.unit !== "piece") {
        openModal(product);
        if (amount > 0) {
          setOrderProducts([...orderProducts, { ...product, amount: amount }]);
        }
      } else {
        setOrderProducts([...orderProducts, { ...product, amount: 1 }]);
      }
    }

    calculateTotal();
  };

  const isOnCart = (id) => {
    const result = orderProducts.some((item) => item.id === id);
    return result;
  };

  const emptyCart = () => {
    setOrderProducts([]);
    setCartTotal(0);
  };

  const openModal = (product) => {
    setIsOpen(!isOpen);
    setProductModal(product);
  };

  const calculateTotal = () => {
    let sum = orderProducts.reduce(function (prev, current) {
      return prev + +(current.price * current.amount);
    }, 0);
    setCartTotal(sum);
  };

  const valueContext = {
    auth,
    role,
    branch,
    cartTotal,
    login,
    logout,
    orderProducts,
    addProduct,
    isOpen,
    setIsOpen,
    setProductModal,
    productModal,
    emptyCart,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
