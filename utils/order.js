import API from './api';

export async function placeOrder(orderData) {
  const token = localStorage.getItem('token');
  try {
    const res = await API.post('/orders', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || 'Could not place order!';
  }
}
