import { createContext, useState } from "react";

// Create the context object
export const CartContext = createContext();

// CartProvider component wraps your app to provide cart state globally
export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Add an item to the cart
  function addToCart(item) {
    setCartOpen(true);
    setCartItems(prev => {
      // Look for an existing cart entry with same product/size/color
      const existingIndex = prev.findIndex(
        i =>
          i._id === item._id &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
      );
      if (existingIndex !== -1) {
        // If already exists, just update quantity
        return prev.map((i, idx) =>
          idx === existingIndex
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        // Otherwise, add new cart item
        return [...prev, item];
      }
    });
  }

  // Remove an item from the cart by index
  function removeFromCart(index) {
    setCartItems(items => items.filter((_, i) => i !== index));
  }

  // Update the quantity of a specific cart item
  function updateQuantity(index, quantity) {
    setCartItems(items =>
      items.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  }

  // Clear the cart (e.g. after successful order)
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
