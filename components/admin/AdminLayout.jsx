import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-primary text-white py-10 px-6 flex flex-col space-y-6">
        <Link href="/admin" className="text-2xl font-bold mb-10 hover:underline">
          Admin Panel
        </Link>
        <Link href="/admin/products" className="hover:text-gray-300">Products</Link>
        <Link href="/admin/categories" className="hover:text-gray-300">Categories</Link>
        <Link href="/admin/orders" className="hover:text-gray-300">Orders</Link>
        <Link href="/" className="mt-10 hover:text-gray-300">Back to Shop</Link>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
