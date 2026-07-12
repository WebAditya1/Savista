import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '../../../shared/types';

export interface CartItem {
  productId: string;
  productSlug: string;
  productName: string;
  image: string;
  quantity: number;
  width?: string;
  height?: string;
  requirements?: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  lastAddedName: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addProduct: (product: Pick<Product, '_id' | 'slug' | 'name' | 'image'>, quantity?: number) => void;
  updateItem: (productId: string, updates: Partial<Omit<CartItem, 'productId' | 'productSlug' | 'productName' | 'image'>>) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  clearLastAdded: () => void;
}

const STORAGE_KEY = 'savista-quote-cart';

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadStoredItems());
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addProduct = useCallback(
    (product: Pick<Product, '_id' | 'slug' | 'name' | 'image'>, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.productId === product._id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          {
            productId: product._id,
            productSlug: product.slug,
            productName: product.name,
            image: product.image,
            quantity,
          },
        ];
      });
      setLastAddedName(product.name);
    },
    []
  );

  const updateItem = useCallback(
    (productId: string, updates: Partial<Omit<CartItem, 'productId' | 'productSlug' | 'productName' | 'image'>>) => {
      setItems((prev) =>
        prev.map((item) => (item.productId === productId ? { ...item, ...updates } : item))
      );
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      isOpen,
      lastAddedName,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
      addProduct,
      updateItem,
      removeItem,
      clearCart,
      clearLastAdded: () => setLastAddedName(null),
    }),
    [items, isOpen, lastAddedName, addProduct, updateItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
