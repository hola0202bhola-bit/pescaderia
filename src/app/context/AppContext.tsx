import { createContext, useContext, useState, ReactNode } from "react";

export type DishCategory = "Entradas" | "Platos Fuertes" | "Bebidas" | "Postres";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  available: boolean;
  recommended: boolean;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: "completado" | "pendiente" | "cancelado";
  table?: string;
}

export type TableStatus = "libre" | "ocupado" | "reservado";
export type TableShape = "rectangular" | "circular";

export interface Table {
  id: string;
  name: string;
  type: TableShape;
  status: TableStatus;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  rotation?: number;
  time?: string;
}

export interface Insumo {
  id: string;
  name: string;
  stockActual: number;
  stockMinimo: number;
  unit: string;
}

interface AppContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Orders
  orders: Order[];
  placeOrder: (paymentMethod: string, table?: string) => void;
  // Dishes
  dishes: Dish[];
  addDish: (dish: Omit<Dish, "id" | "recommended">) => void;
  updateDish: (id: string, updatedFields: Partial<Dish>) => void;
  removeDish: (id: string) => void;
  toggleAvailable: (id: string) => void;
  toggleRecommended: (id: string) => void;
  // Tables
  tables: Table[];
  addTable: (table: Omit<Table, "status">) => void;
  updateTable: (id: string, updatedFields: Partial<Table>) => void;
  removeTable: (id: string) => void;
  // Insumos
  insumos: Insumo[];
  addInsumo: (insumo: Omit<Insumo, "id">) => void;
  updateInsumo: (id: string, updatedFields: Partial<Insumo>) => void;
  removeInsumo: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const initialDishes: Dish[] = [
  { id: "1", name: "Ceviche Mixto", description: "Camarón y pescado fresco marinado en limón, cilantro, cebolla morada y aguacate", price: 169.00, category: "Entradas", available: true, recommended: true, image: "https://images.unsplash.com/photo-1534080391025-a77c7f46654e?w=400&h=300&fit=crop" },
  { id: "2", name: "Tostada de Mariscos", description: "Tostada crujiente con ceviche de camarón, pulpo y aderezo especial de chipotle", price: 85.00, category: "Entradas", available: true, recommended: true, image: "https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=400&h=300&fit=crop" },
  { id: "3", name: "Cóctel de Camarón", description: "Camarones selectos en nuestra salsa coctelera artesanal con cilantro y aguacate", price: 145.00, category: "Entradas", available: true, recommended: false, image: "https://images.unsplash.com/photo-1559058922-4c2c2c8d9f1d?w=400&h=300&fit=crop" },
  { id: "4", name: "Filete al Mojo de Ajo", description: "Filete de pescado a la plancha bañado en ajo dorado al sartén, servido con arroz y ensalada", price: 189.00, category: "Platos Fuertes", available: true, recommended: true, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop" },
  { id: "5", name: "Caldo de Mariscos", description: "Tradicional sopa caliente de la casa con camarón, pulpo, almejas y verduras", price: 195.00, category: "Platos Fuertes", available: true, recommended: false, image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
  { id: "6", name: "Michelada Pescadora", description: "Cerveza fría preparada con nuestra mezcla secreta de salsas negras, limón y clamato", price: 95.00, category: "Bebidas", available: true, recommended: false, image: "https://images.unsplash.com/photo-1596546335970-1dfa5d0a4126?w=400&h=300&fit=crop" },
  { id: "7", name: "Agua de Horchata", description: "Agua fresca tradicional con canela y un toque cremoso", price: 35.00, category: "Bebidas", available: true, recommended: false, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop" },
  { id: "8", name: "Pay de Limón", description: "Pay cremoso helado con galleta maría y ralladura de limón fresco", price: 65.00, category: "Postres", available: true, recommended: true, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop" },
];

const initialTables: Table[] = [
  { id: "A1", name: "A1", type: "rectangular", status: "libre", x: 50, y: 80, width: 80, height: 40 },
  { id: "A2", name: "A2", type: "rectangular", status: "ocupado", x: 150, y: 80, width: 80, height: 40, time: "00:45 h" },
  { id: "A3", name: "A3", type: "rectangular", status: "reservado", x: 250, y: 80, width: 80, height: 40 },
  { id: "A4", name: "A4", type: "rectangular", status: "libre", x: 350, y: 80, width: 80, height: 40 },
  { id: "B1", name: "B1", type: "circular", status: "libre", x: 85, y: 180, radius: 30 },
  { id: "B2", name: "B2", type: "circular", status: "ocupado", x: 185, y: 180, radius: 30, time: "01:15 h" },
  { id: "B3", name: "B3", type: "circular", status: "libre", x: 285, y: 180, radius: 30 },
  { id: "B4", name: "B4", type: "circular", status: "reservado", x: 385, y: 180, radius: 30 },
  { id: "C1", name: "C1", type: "rectangular", status: "ocupado", x: 50, y: 280, width: 80, height: 40, time: "01:24 h" },
  { id: "C2", name: "C2", type: "rectangular", status: "libre", x: 150, y: 280, width: 80, height: 40 },
  { id: "C3", name: "C3", type: "rectangular", status: "ocupado", x: 250, y: 280, width: 80, height: 40, time: "00:30 h" },
  { id: "C4", name: "C4", type: "rectangular", status: "libre", x: 350, y: 280, width: 80, height: 40 },
  { id: "D1", name: "D1", type: "circular", status: "reservado", x: 85, y: 380, radius: 30 },
  { id: "D2", name: "D2", type: "circular", status: "libre", x: 185, y: 380, radius: 30 },
  { id: "D3", name: "D3", type: "circular", status: "ocupado", x: 285, y: 380, radius: 30, time: "02:10 h" },
  { id: "D4", name: "D4", type: "circular", status: "libre", x: 385, y: 380, radius: 30 },
];

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2026-06-28T20:15:00",
    items: [
      { id: "1", name: "Ceviche Mixto", price: 169.00, quantity: 2, image: "https://images.unsplash.com/photo-1534080391025-a77c7f46654e?w=400&h=300&fit=crop", category: "Entradas" },
      { id: "7", name: "Agua de Horchata", price: 35.00, quantity: 1, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop", category: "Bebidas" },
    ],
    total: 373.00,
    paymentMethod: "Tarjeta de Crédito",
    status: "completado",
    table: "A2",
  },
  {
    id: "ORD-002",
    date: "2026-06-29T13:40:00",
    items: [
      { id: "2", name: "Tostada de Mariscos", price: 85.00, quantity: 1, image: "https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=400&h=300&fit=crop", category: "Entradas" },
      { id: "8", name: "Pay de Limón", price: 65.00, quantity: 2, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop", category: "Postres" },
    ],
    total: 215.00,
    paymentMethod: "Efectivo",
    status: "completado",
    table: "B3",
  },
  {
    id: "ORD-003",
    date: "2026-07-01T19:05:00",
    items: [
      { id: "4", name: "Filete al Mojo de Ajo", price: 189.00, quantity: 1, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop", category: "Platos Fuertes" },
    ],
    total: 189.00,
    paymentMethod: "Transferencia Bancaria",
    status: "pendiente",
    table: "C1",
  },
];

const initialInsumos: Insumo[] = [
  { id: "i1", name: "Pulpo Fresco", stockActual: 15, stockMinimo: 5, unit: "kg" },
  { id: "i2", name: "Aceite de Oliva", stockActual: 10, stockMinimo: 2, unit: "L" },
  { id: "i3", name: "Pimentón de la Vera", stockActual: 2, stockMinimo: 0.5, unit: "kg" },
  { id: "i4", name: "Patatas Cocidas", stockActual: 40, stockMinimo: 10, unit: "kg" },
  { id: "i5", name: "Sal de Grano", stockActual: 1.2, stockMinimo: 2, unit: "kg" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [insumos, setInsumos] = useState<Insumo[]>(initialInsumos);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, delta: number) =>
    setCartItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
    );

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const placeOrder = (paymentMethod: string, table?: string) => {
    if (cartItems.length === 0) return;
    const order: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString(),
      items: [...cartItems],
      total: cartTotal,
      paymentMethod,
      status: "completado",
      table,
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
  };

  const addDish = (dish: Omit<Dish, "id" | "recommended">) => {
    setDishes((prev) => [
      ...prev,
      {
        ...dish,
        id: String(prev.length > 0 ? Math.max(...prev.map((d) => parseInt(d.id) || 0)) + 1 : 1),
        recommended: false,
      },
    ]);
  };

  const updateDish = (id: string, updatedFields: Partial<Dish>) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedFields } : d))
    );
  };

  const removeDish = (id: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const toggleAvailable = (id: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d))
    );
  };

  const toggleRecommended = (id: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, recommended: !d.recommended } : d))
    );
  };

  const addTable = (table: Omit<Table, "status">) => {
    setTables((prev) => [...prev, { ...table, status: "libre" }]);
  };

  const updateTable = (id: string, updatedFields: Partial<Table>) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const removeTable = (id: string) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  const addInsumo = (insumo: Omit<Insumo, "id">) => {
    setInsumos((prev) => [
      ...prev,
      {
        ...insumo,
        id: `i${prev.length > 0 ? Math.max(...prev.map((i) => parseInt(i.id.replace(/\D/g, "")) || 0)) + 1 : 1}`,
      },
    ]);
  };

  const updateInsumo = (id: string, updatedFields: Partial<Insumo>) => {
    setInsumos((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updatedFields } : i))
    );
  };

  const removeInsumo = (id: string) => {
    setInsumos((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        dishes,
        addDish,
        updateDish,
        removeDish,
        toggleAvailable,
        toggleRecommended,
        tables,
        addTable,
        updateTable,
        removeTable,
        insumos,
        addInsumo,
        updateInsumo,
        removeInsumo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
