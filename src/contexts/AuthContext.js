import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  checkLoging: () => {},
  auth: undefined,
  role: undefined,
  store: undefined,
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
  setMethod: () => {},
  method: "cash",
  emptyCart: () => {},
  setStore: () => {},
  setBranch: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [orderProducts, setOrderProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [auth, setAuth] = useState(null);
  const [role, setRole] = useState(null);
  const [store, setStore] = useState(null);
  const [branch, setBranch] = useState(null);
  const [method, setMethod] = useState("cash");

  const login = async (userData) => {
    await AsyncStorage.multiSet([
      ["auth", userData.token],
      ["role", userData.role],
      ["store", userData.store.toString()],
      ["branch", userData.branch.toString()],
    ]).then(() => {
      setAuth(userData.token);
      setRole(userData.role);
      setStore(parseInt(userData.store));
      setBranch(parseInt(userData.branch));
    });
  };

  const checkLoging = () => {
    AsyncStorage.getItem("auth").then((value) => {
      if (value) {
        setAuth(value);
      }
    });

    AsyncStorage.getItem("branch").then((value) => {
      if (value) {
        setBranch(parseInt(value));
      }
    });

    AsyncStorage.getItem("store").then((value) => {
      if (value) {
        setStore(parseInt(value));
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
    auth,
    role,
    store,
    branch,
    cartTotal,
    login,
    logout,
    orderProducts,
    addProduct,
    isOpen,
    setIsOpen,
    setProductModal,
    setStore,
    setBranch,
    productModal,
    emptyCart,
    calculateTotal,
    setMethod,
    method,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
