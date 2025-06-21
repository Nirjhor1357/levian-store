import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import withAdminAuth from "../../utils/withAdminAuth";
import API from "../../utils/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    API.get("/products", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data))
      .catch(() => setMsg("Failed to fetch products"));
  }, [token]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      {msg && <p className="mb-4 text-red-600">{msg}</p>}
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td className="p-2 border">{prod.name}</td>
              <td className="p-2 border">${prod.price}</td>
              <td className="p-2 border">{prod.countInStock}</td>
              <td className="p-2 border">{prod.category?.name || "—"}</td>
              <td className="p-2 border">
                {/* Add Edit/Delete buttons here */}
                <button className="text-blue-600 mr-2">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default withAdminAuth(AdminProducts);
