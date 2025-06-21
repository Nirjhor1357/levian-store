import { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { placeOrder } from '../utils/order';
import { useRouter } from 'next/router';

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Calculate totals
  const itemsPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  async function handleOrder(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      // Convert cartItems to the shape expected by the backend
      const orderItems = cartItems.map(item => ({
        product: item._id,         // Ensure you use _id from MongoDB!
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        size: item.selectedSize,
        color: item.selectedColor
      }));
      const orderData = {
        orderItems,
        shippingAddress: shipping,
        paymentMethod: 'Cash On Delivery',
        itemsPrice,
        shippingPrice,
        totalPrice
      };
      await placeOrder(orderData);
      setMsg('Order placed successfully!');
      setCartItems([]); // Optionally clear cart after order
      // Optionally redirect to a confirmation page:
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      setMsg(err.toString());
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h1 className="text-2xl mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <div className="mb-4 text-red-500">Your cart is empty!</div>
      ) : (
      <form onSubmit={handleOrder} className="space-y-4">
        <input placeholder="Address" className="w-full p-2 border rounded" required
               value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} />
        <input placeholder="City" className="w-full p-2 border rounded" required
               value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} />
        <input placeholder="Postal Code" className="w-full p-2 border rounded" required
               value={shipping.postalCode} onChange={e => setShipping(s => ({ ...s, postalCode: e.target.value }))} />
        <input placeholder="Country" className="w-full p-2 border rounded" required
               value={shipping.country} onChange={e => setShipping(s => ({ ...s, country: e.target.value }))} />
        <div className="my-4">
          <h2 className="font-bold">Order Summary</h2>
          <ul>
            {cartItems.map((item, i) => (
              <li key={i} className="text-gray-600">
                {item.name} ({item.selectedSize}/{item.selectedColor}) × {item.quantity} = <b>${item.price * item.quantity}</b>
              </li>
            ))}
          </ul>
          <p className="mt-2">Items: ${itemsPrice}</p>
          <p>Shipping: ${shippingPrice}</p>
          <p>Total: <b>${totalPrice}</b></p>
        </div>
        <button className="w-full bg-primary text-white py-2 rounded" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      )}
      {msg && <div className="mt-4 text-blue-600">{msg}</div>}
    </div>
  );
}
