import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
      {/* You can add an image at /public/images/404-illustration.svg */}
      <img src="/images/404-illustration.svg" alt="Not Found" className="w-72 mb-6" />
      <h1 className="text-5xl font-bold mb-2 text-primary">404</h1>
      <h2 className="text-2xl font-light mb-4">Page Not Found</h2>
      <p className="mb-8 text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link href="/" className="bg-primary text-white px-6 py-2 rounded font-medium hover:bg-primary/90">Back to Home</Link>
    </div>
  )
}
