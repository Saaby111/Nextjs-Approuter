'use client';

import React from 'react';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartActions = {
  add: (item: Omit<CartItem, 'quantity'>) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<
  { state: CartState; actions: CartActions } | null
>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
 const [state, setState] = React.useState<CartState>(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure it's an object with an items array
        if (parsed && Array.isArray(parsed.items)) {
          return parsed as CartState;
        }
      } catch {
        // Invalid JSON – ignore and return default
      }
    }
  }
  return { items: [] };
});

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const add: CartActions["add"] = (item) => {
    setState((prev) => {
      const existing = prev.items.find((i) => i.id === item.id);

      if (existing) {
        return {
          items: prev.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        items: [...prev.items, { ...item, quantity: 1 }],
      };
    });
  };

  const remove: CartActions["remove"] = (id) =>
    setState((prev) => ({
      items: prev.items.filter((i) => i.id !== id),
    }));

  const clear: CartActions["clear"] = () => setState({ items: [] });

  return (
    <CartContext.Provider value={{ state, actions: { add, remove, clear } }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }

  return ctx;
}