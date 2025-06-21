import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import withAdminAuth from "../../utils/withAdminAuth";
import API from "../../utils/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    API.get("/categories", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCategories(res.data))
      .catch(() => setMsg("Failed to fetch categories"));
  }, [token]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>
      {msg && <p className="mb-4 text-red-600">{msg}</p>}
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat._id}>
              <td className="p-2 border">{cat.name}</td>
              <td className="p-2 border">
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

export default withAdminAuth(AdminCategories);
