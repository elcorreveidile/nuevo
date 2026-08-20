"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export type CartItem = {
  slug: string;
  title: string;
  priceCents: number;
  image: string;
  size?: string;
  qty: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: "add"; item: CartItem }
  | { type: "remove"; key: string }
  | { type: "qty"; key: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; state: State };

const STORAGE_KEY = "nk_cart_v1";

function keyOf(i: { slug: string; size?: string }) {
  return `${i.slug}::${i.size ?? ""}`;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const k = keyOf(action.item);
      const existing = state.items.find((i) => keyOf(i) === k);
      if (existing) {
        return {
          items: state.items.map((i) =>
            keyOf(i) === k ? { ...i, qty: i.qty + action.item.qty } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "remove":
      return { items: state.items.filter((i) => keyOf(i) !== action.key) };
    case "qty":
      return {
        items: state.items.map((i) =>
          keyOf(i) === action.key ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

type CartValue = {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  keyOf: (i: { slug: string; size?: string }) => string;
};

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Hidratar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  // Persistir
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value = useMemo<CartValue>(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const subtotalCents = state.items.reduce(
      (n, i) => n + i.priceCents * i.qty,
      0
    );
    return {
      items: state.items,
      count,
      subtotalCents,
      add: (item) => dispatch({ type: "add", item }),
      remove: (key) => dispatch({ type: "remove", key }),
      setQty: (key, qty) => dispatch({ type: "qty", key, qty }),
      clear: () => dispatch({ type: "clear" }),
      keyOf,
    };
  }, [state]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
