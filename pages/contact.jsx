import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email.match(/^[^@]+@[^@]+\.[^@]+$/) || !form.message) {
      setStatus('error')
      return
    }
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
    // Hook to EmailJS or backend if you wish
  }

  return (
    <main className="container mx-auto px-4 py-16">
<h1 className="text-red-500">TEST</h1>
      <h1 className="text-3xl font-light text-primary mb-8">Contact Us</h1>
      <form className="max-w-lg mx-auto bg-white rounded-xl shadow p-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-medium hover:bg-primary/90">
          Send Message
        </button>
        {status === 'success' && <p className="text-green-600 mt-4">Message sent! We'll be in touch soon.</p>}
        {status === 'error' && <p className="text-red-600 mt-4">Please fill out all fields with a valid email.</p>}
      </form>
    </main>
  )
}
