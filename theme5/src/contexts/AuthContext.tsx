import { createContext, useContext, useState, ReactNode } from "react";
import type { Address, Order } from "@/types/product";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    items: [],
    total: 189,
    status: "delivered",
    date: "2026-02-15",
    address: { id: "a1", name: "Home", street: "123 Green St", city: "Portland", state: "OR", zip: "97201", country: "US", isDefault: true },
  },
  {
    id: "ORD-002",
    items: [],
    total: 370,
    status: "shipped",
    date: "2026-03-10",
    address: { id: "a1", name: "Home", street: "123 Green St", city: "Portland", state: "OR", zip: "97201", country: "US", isDefault: true },
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("stride-user");
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const [addresses, setAddresses] = useState<Address[]>([
    { id: "a1", name: "Home", street: "123 Green St", city: "Portland", state: "OR", zip: "97201", country: "US", isDefault: true },
  ]);

  const login = (email: string, _password: string) => {
    const u = { id: "user-1", name: email.split("@")[0], email };
    setUser(u);
    localStorage.setItem("stride-user", JSON.stringify(u));
    return true;
  };

  const signup = (name: string, email: string, _password: string) => {
    const u = { id: "user-" + Date.now(), name, email };
    setUser(u);
    localStorage.setItem("stride-user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("stride-user");
  };

  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);
  const addAddress = (address: Address) => setAddresses((prev) => [...prev, address]);
  const removeAddress = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, orders, addOrder, addresses, addAddress, removeAddress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
