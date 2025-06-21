import { useState } from "react";
import API from "../../utils/api";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      if (!res.data.user.isAdmin) {
        setMsg("Not an admin account");
        return;
      }
      localStorage.setItem("token", res.data.token);
      router.push("/admin");
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="max-w-xs mx-auto mt-40 bg-white rounded shadow p-6">
      <h1 className="text-xl mb-4 font-bold text-primary">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="Admin Email"
          type="email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-primary text-white py-2 rounded">
          Login
        </button>
      </form>
      {msg && <p className="mt-2 text-red-600">{msg}</p>}
    </div>
  );
}
