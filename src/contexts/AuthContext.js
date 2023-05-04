import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  checkLoging: () => {},
  auth: undefined,
  name: undefined,
  role: undefined,
  store: undefined,
  branch: undefined,
  cartTotal: 0,
  calculateTotal: () => {},
  login: () => {},
  logout: () => {},
  orderProducts: [],
  editOrder: () => {},
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
  orderEditing: undefined,
  editQuantity: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [orderProducts, setOrderProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [auth, setAuth] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [store, setStore] = useState(null);
  const [branch, setBranch] = useState(null);
  const [orderEditing, setOrderEditing] = useState(null);
  const [method, setMethod] = useState("cash");

  const login = async (userData) => {
    await AsyncStorage.multiSet([
      ["auth", userData.token],
      ["name", userData.name],
      ["role", userData.role],
      ["store", userData.store.toString()],
      ["branch", userData.branch.toString()],
    ]).then(() => {
      setAuth(userData.token);
      setName(userData.name);
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

    AsyncStorage.getItem("name").then((value) => {
      if (value) {
        setName(value);
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

  const addProduct = (product, quantity = 0) => {
    if (isOnCart(product.id)) {
      const newProducts = orderProducts;
      const currentProduct = newProducts.find(function (found) {
        return found.id === product.id;
      });

      if (currentProduct.unit !== "piece") {
        openModal(product);
        currentProduct.quantity =
          parseFloat(quantity) + parseFloat(currentProduct.quantity);
        if (quantity > 0) {
          setOrderProducts([...newProducts]);
        }
      } else {
        currentProduct.quantity += 1;
        setOrderProducts([...newProducts]);
      }
    } else {
      if (product.unit !== "piece") {
        openModal(product);
        if (quantity > 0) {
          setOrderProducts([
            ...orderProducts,
            { ...product, quantity: quantity },
          ]);
        }
      } else {
        setOrderProducts([...orderProducts, { ...product, quantity: 1 }]);
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
    setOrderEditing(null);
  };

  editOrder = (order) => {
    console.log("🚀 ~ file: AuthContext.js:152 ~ AuthProvider ~ order:", order);
    setOrderEditing(order);
    setOrderProducts(order.products);
    calculateTotal();
  };

  const selectOrder = (id, products) => {
    setOrderProducts([...products]);
  };

  const openModal = (product) => {
    setIsOpen(!isOpen);
    setProductModal(product);
  };

  const calculateTotal = () => {
    let total = 0;
    orderProducts.forEach((product) => {
      total += product.price * product.quantity;
    });

    setCartTotal(total.toFixed(2));
  };

  const editQuantity = (id, quantity) => {
    const newProducts = orderProducts;
    const currentProduct = newProducts.find(function (found) {
      return found.id === id;
    });
    currentProduct.quantity = parseFloat(currentProduct.quantity);
    currentProduct.quantity += quantity;

    if (currentProduct.quantity > 0) {
      setOrderProducts([...newProducts]);
      calculateTotal();
    } else {
      currentProduct.quantity = 1;
    }
  };

  const valueContext = {
    checkLoging,
    auth,
    name,
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
    editOrder,
    orderEditing,
    editQuantity,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
