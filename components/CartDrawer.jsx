import { useContext } from "react";
import { CartContext } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-50"
          style={{ overflowY: "auto" }}
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-medium text-primary">Your Cart ({cartItems.length})</h3>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary" onClick={() => setCartOpen(false)}>
              <span className="text-xl">&times;</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-gray-500">Your cart is empty.</div>
            ) : cartItems.map((item, idx) => (
              <div key={idx} className="flex py-4 border-b border-gray-100">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover object-top rounded" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-primary">{item.name}</h4>
                    <button className="text-gray-400 hover:text-primary" onClick={() => removeFromCart(idx)}>
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Size: {item.selectedSize} / Color: {item.selectedColor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary"
                        onClick={() => updateQuantity(idx, Math.max(1, item.quantity - 1))}
                      >-</button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary"
                        onClick={() => updateQuantity(idx, item.quantity + 1)}
                      >+</button>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between mb-6 text-lg font-medium">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded font-medium hover:bg-primary/90 mb-3 whitespace-nowrap">Checkout</button>
            <button className="w-full border border-primary text-primary py-3 rounded font-medium hover:bg-primary/5 whitespace-nowrap" onClick={() => setCartOpen(false)}>Continue Shopping</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
