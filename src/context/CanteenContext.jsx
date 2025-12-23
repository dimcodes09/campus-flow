import { createContext, useContext, useEffect, useState } from "react";

const CanteenContext = createContext();

const STORAGE_KEY = "canteen_v2";

const initialMenu = [
  {
    id: 1,
    name: "Veg Thali",
    price: 60,
    previousPrice: 55,
    status: "available",
    visible: true,
    reason: "",
    refillTime: "",
  },
  {
    id: 2,
    name: "Samosa",
    price: 15,
    previousPrice: 15,
    status: "soldout",
    visible: true,
    reason: "Sold out for today",
    refillTime: "Tomorrow morning",
  },
  {
    id: 3,
    name: "Poha",
    price: 25,
    previousPrice: 20,
    status: "available",
    visible: true,
    reason: "",
    refillTime: "",
  },
  {
    id: 4,
    name: "Tea",
    price: 10,
    previousPrice: 10,
    status: "available",
    visible: true,
    reason: "",
    refillTime: "",
  },
  {
    id: 5,
    name: "Coffee",
    price: 15,
    previousPrice: 15,
    status: "limited",
    visible: true,
    reason: "Low stock",
    refillTime: "30 minutes",
  },
  {
    id: 6,
    name: "Veg Biryani",
    price: 80,
    previousPrice: 70,
    status: "available",
    visible: true,
    reason: "",
    refillTime: "",
  },
  {
    id: 7,
    name: "Maggi",
    price: 30,
    previousPrice: 25,
    status: "available",
    visible: true,
    reason: "",
    refillTime: "",
  },
  {
    id: 8,
    name: "Bread Omelette",
    price: 35,
    previousPrice: 30,
    status: "limited",
    visible: true,
    reason: "Egg supply low",
    refillTime: "Evening",
  },
];

export const CanteenProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [rushLevel, setRushLevel] = useState("medium");

  /* LOAD */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setMenu(initialMenu);
      return;
    }
    const data = JSON.parse(saved);
    setMenu(data.menu || initialMenu);
    setRushLevel(data.rushLevel || "medium");
  }, []);

  /* SAVE */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ menu, rushLevel })
    );
  }, [menu, rushLevel]);

  /* ADMIN ACTIONS */

  const addItem = item => {
    setMenu(prev => [
      ...prev,
      {
        ...item,
        id: Date.now(),
        visible: true,
        previousPrice: item.price,
      },
    ]);
  };

  const removeItem = id => {
    setMenu(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id, updated) => {
    setMenu(prev =>
      prev.map(i => (i.id === id ? updated : i))
    );
  };

  const updateStatus = (id, status) => {
    setMenu(prev =>
      prev.map(i =>
        i.id === id ? { ...i, status } : i
      )
    );
  };

  const toggleVisibility = id => {
    setMenu(prev =>
      prev.map(i =>
        i.id === id ? { ...i, visible: !i.visible } : i
      )
    );
  };

  return (
    <CanteenContext.Provider
      value={{
        menu,
        rushLevel,
        setRushLevel,
        addItem,
        removeItem,
        updateItem,
        updateStatus,
        toggleVisibility,
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => useContext(CanteenContext);
