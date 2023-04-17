import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  checkLoging: () => {},
  auth: undefined,
  role: undefined,
  branch: undefined,
  cartTotal: 0,
  calculateTotal: () => {},
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
  const [orderProducts, setOrderProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [auth, setAuth] = useState(null);
  const [role, setRole] = useState(null);
  const [branch, setBranch] = useState(null);

  const login = async (userData) => {
    await AsyncStorage.multiSet([
      ["auth", userData.token],
      ["branch", userData.branch.toString()],
      ["role", userData.role],
    ]).then(() => {
      setAuth(userData.token);
      setBranch(userData.branch);
      setRole(userData.role);
    });
  };

  const checkLoging = () => {
    AsyncStorage.getItem("auth").then((value) => {
      if (value) {
        console.log("asjkjansd");
        setAuth(value);
      }
    });

    AsyncStorage.getItem("branch").then((value) => {
      if (value) {
        setBranch(value);
      }
    });

    AsyncStorage.getItem("role").then((value) => {
      if (value) {
        setRole(value);
      }
    });
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["auth", "branch", "role"]).then(() => {
      console.log("logout");
      setAuth(null);
      setBranch(null);
      setAuth(null);
    });
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
    let total = 0;
    orderProducts.forEach((product) => {
      total += product.price * product.amount;
    });
    setCartTotal(total);
  };

  const valueContext = {
    checkLoging,
    branch,
    role,
    auth,
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
    calculateTotal,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
