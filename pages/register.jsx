import { useState } from 'react';
import API from '../utils/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      setMsg('Registration successful! You can now log in.');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full p-2 border rounded" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full p-2 border rounded" />
        <button className="w-full bg-primary text-white py-2 rounded">Register</button>
      </form>
      {msg && <p className="mt-4 text-red-600">{msg}</p>}
    </div>
  );
}
