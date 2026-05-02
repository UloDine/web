"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem extends MenuData {
  quantity: number;
}

type CartStoreState = Record<string, CartItem[]>;
type SelectedItemsState = Record<string, CartItem[]>;

interface CartContextProps {
  cart: CartStoreState;
  selectedItems: SelectedItemsState;
  totalItems: number;
  total: (restaurantId: string) => number;
  calculateTotal: (list: CartItem[]) => number;
  addItem: (restaurantId: string, item: MenuData, quantity?: number) => void;
  removeItem: (restaurantId: string, itemId: string) => void;
  incrementQty: (restaurantId: string, itemId: string) => void;
  decrementQty: (restaurantId: string, itemId: string) => void;
  selectItem: (restaurantId: string, item: CartItem | null) => void;
  checkOut: (restaurantId: string) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartStoreState>({});
  const [selectedItems, setSelectedItems] = useState<SelectedItemsState>({});

  const getStorageKey = (restaurantId: string) => `cart_${restaurantId}`;

  const readCart = (restaurantId: string) => {
    if (typeof window === "undefined") {
      return [] as CartItem[];
    }

    const savedCart = localStorage.getItem(getStorageKey(restaurantId));
    if (!savedCart) {
      return [] as CartItem[];
    }

    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [] as CartItem[];
    }
  };

  const saveCart = (restaurantId: string, nextCart: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        getStorageKey(restaurantId),
        JSON.stringify(nextCart),
      );
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextCart: CartStoreState = {};
    const nextSelectedItems: SelectedItemsState = {};

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key || !key.startsWith("cart_")) {
        continue;
      }

      const restaurantId = key.replace("cart_", "");
      nextCart[restaurantId] = readCart(restaurantId);
      nextSelectedItems[restaurantId] = [];
    }

    setCart(nextCart);
    setSelectedItems(nextSelectedItems);
  }, []);

  const addItem = (
    restaurantId: string,
    item: MenuData,
    quantity: number = 1,
  ) => {
    setCart((prevCart) => {
      const currentCart = prevCart[restaurantId] ?? readCart(restaurantId);
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id,
      );

      const nextCart = existingItem
        ? currentCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem,
          )
        : [...currentCart, { ...item, quantity }];

      saveCart(restaurantId, nextCart);
      return { ...prevCart, [restaurantId]: nextCart };
    });
  };

  const removeItem = (restaurantId: string, itemId: string) => {
    setCart((prevCart) => {
      const currentCart = prevCart[restaurantId] ?? readCart(restaurantId);
      const nextCart = currentCart.filter((item) => item.id !== itemId);
      saveCart(restaurantId, nextCart);
      return { ...prevCart, [restaurantId]: nextCart };
    });

    setSelectedItems((prevSelected) => {
      const selected = prevSelected[restaurantId] ?? [];
      if (!selected.some((selectedItem) => selectedItem.id === itemId)) {
        return prevSelected;
      }

      return {
        ...prevSelected,
        [restaurantId]: selected.filter(
          (selectedItem) => selectedItem.id !== itemId,
        ),
      };
    });
  };

  const incrementQty = (restaurantId: string, itemId: string) => {
    setCart((prevCart) => {
      const currentCart = prevCart[restaurantId] ?? readCart(restaurantId);
      const nextCart = currentCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      );
      saveCart(restaurantId, nextCart);
      return { ...prevCart, [restaurantId]: nextCart };
    });
  };

  const decrementQty = (restaurantId: string, itemId: string) => {
    setCart((prevCart) => {
      const currentCart = prevCart[restaurantId] ?? readCart(restaurantId);
      const nextCart = currentCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);

      saveCart(restaurantId, nextCart);
      return { ...prevCart, [restaurantId]: nextCart };
    });

    setSelectedItems((prevSelected) => {
      const selected = prevSelected[restaurantId] ?? [];
      if (!selected.some((selectedItem) => selectedItem.id === itemId)) {
        return prevSelected;
      }

      return {
        ...prevSelected,
        [restaurantId]: selected.filter(
          (selectedItem) => selectedItem.id !== itemId,
        ),
      };
    });
  };

  const selectItem = (restaurantId: string, item: CartItem | null) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [restaurantId]: item
        ? prevSelected[restaurantId]?.some(
            (selectedItem) => selectedItem.id === item.id,
          )
          ? prevSelected[restaurantId].filter(
              (selectedItem) => selectedItem.id !== item.id,
            )
          : [...(prevSelected[restaurantId] ?? []), item]
        : [],
    }));
  };

  const totalItems = Object.values(cart).reduce(
    (total, restaurantCart) =>
      total + restaurantCart.reduce((sum, item) => sum + item.quantity, 0),
    0,
  );

  const total = (restaurantId: string) => {
    const restaurantCart = cart[restaurantId] ?? readCart(restaurantId);
    return restaurantCart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
  };

  const calculateTotal = (list: CartItem[]) => {
    return list.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
  };

  const checkOut = async (restaurantId: string) => {
    // TODO: Implement checkout logic with API call
    void restaurantId;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        selectedItems,
        totalItems,
        total,
        addItem,
        removeItem,
        incrementQty,
        decrementQty,
        selectItem,
        checkOut,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
