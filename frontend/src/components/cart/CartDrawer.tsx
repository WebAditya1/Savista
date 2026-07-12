import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { LazyImage } from '@/components/ui/LazyImage';
import { cn } from '@/utils/cn';

export function CartDrawer() {
  const { items, itemCount, isOpen, closeCart, updateItem, removeItem, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Quote cart"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg">Quote Cart</h2>
                  <p className="text-sm text-slate-500">{itemCount} item{itemCount === 1 ? '' : 's'} selected</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium mb-2">Your quote cart is empty</p>
                  <p className="text-sm text-slate-500 mb-6">Browse products and add them to request a combined quote.</p>
                  <Button to="/products" onClick={closeCart}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-4 rounded-2xl bg-surface border border-slate-100">
                    <Link
                      to={`/products/${item.productSlug}`}
                      onClick={closeCart}
                      className="w-20 h-20 rounded-xl overflow-hidden shrink-0"
                    >
                      <LazyImage src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.productSlug}`}
                        onClick={closeCart}
                        className="font-medium text-slate-800 hover:text-brand-600 line-clamp-2"
                      >
                        {item.productName}
                      </Link>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(item.productId, {
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateItem(item.productId, { quantity: item.quantity + 1 })}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className={cn(
                            'ml-auto p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors'
                          )}
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 space-y-3 bg-white">
                <Button to="/inquiry?from=cart" className="w-full justify-center" onClick={closeCart}>
                  Request Quote for {itemCount} Item{itemCount === 1 ? '' : 's'}
                </Button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-sm text-slate-500 hover:text-red-500 transition-colors py-2"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
