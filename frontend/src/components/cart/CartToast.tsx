import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartToast() {
  const { lastAddedName, clearLastAdded, openCart } = useCart();
  const visible = Boolean(lastAddedName);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(clearLastAdded, 5000);
    return () => clearTimeout(timer);
  }, [visible, clearLastAdded]);

  return (
    <AnimatePresence>
      {visible && lastAddedName && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-sm px-5 py-4 rounded-xl shadow-2xl bg-white border border-slate-100"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700">
                <span className="font-medium">{lastAddedName}</span> added to quote cart.
              </p>
              <button
                type="button"
                onClick={() => {
                  clearLastAdded();
                  openCart();
                }}
                className="mt-2 text-sm font-medium text-brand-600 hover:text-brand-400"
              >
                View quote cart
              </button>
            </div>
            <button
              type="button"
              onClick={clearLastAdded}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
