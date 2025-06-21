import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import withAdminAuth from "../../utils/withAdminAuth";
import API from "../../utils/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    API.get("/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(() => setMsg("Failed to fetch orders"));
  }, [token]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      {msg && <p className="mb-4 text-red-600">{msg}</p>}
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="p-2 border">{order._id}</td>
              <td className="p-2 border">{order.user?.email || "—"}</td>
              <td className="p-2 border">${order.totalPrice}</td>
              <td className="p-2 border">{order.isDelivered ? "Delivered" : "Pending"}</td>
              <td className="p-2 border">
                {/* Add View/Mark as Delivered/Delete buttons here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default withAdminAuth(AdminOrder)
