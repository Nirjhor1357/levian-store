import AdminLayout from "../../components/admin/AdminLayout";
import withAdminAuth from "../../utils/withAdminAuth";

function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Welcome to the Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <span className="text-4xl mb-2">📦</span>
          <span className="font-semibold">Manage Products</span>
        </div>
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <span className="text-4xl mb-2">🗂️</span>
          <span className="font-semibold">Manage Categories</span>
        </div>
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <span className="text-4xl mb-2">🧾</span>
          <span className="font-semibold">Manage Orders</span>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(AdminDashboard);
