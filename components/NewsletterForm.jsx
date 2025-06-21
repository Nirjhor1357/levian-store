import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setError('Please enter a valid email address.')
      setSuccess(false)
      return
    }
    setSuccess(true)
    setError('')
    setEmail('')
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="flex">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 py-3 px-4 border-none bg-gray-50 rounded-l text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-primary text-white px-4 py-3 rounded-r font-medium hover:bg-primary/90 whitespace-nowrap">
          Subscribe
        </button>
      </div>
      {success && <p className="text-green-600 mt-2">Thanks for subscribing!</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  )
}
