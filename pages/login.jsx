import { useState } from 'react';
import API from '../utils/api';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      // Save token in localStorage or cookies for auth
      localStorage.setItem('token', res.data.token);
      setMsg('Logged in!');
      // Redirect or update UI as needed
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full p-2 border rounded" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full p-2 border rounded" />
        <button className="w-full bg-primary text-white py-2 rounded">Login</button>
      </form>
      {msg && <p className="mt-4 text-red-600">{msg}</p>}
    </div>
  );
}
