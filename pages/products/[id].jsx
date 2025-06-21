import { useRouter } from 'next/router'
import products from '../../data/products.json'
import { useContext, useState } from 'react'
import { CartContext } from '../../components/CartContext'
import StarRating from '../../components/StarRating'
import Head from 'next/head'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const product = products.find(p => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Cream')
  const { addToCart } = useContext(CartContext)

  if (!product) return <div className="p-8 text-center text-lg">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-16">
      <Head>
        <title>{product.name} | Levián</title>
        <meta name="description" content={`Buy ${product.name} at Levián. Premium, stylish, and comfortable.`} />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-[600px] object-cover object-top rounded-xl" />
        </div>
        <div>
          <h1 className="text-3xl font-light text-primary mb-2">{product.name}</h1>
          <StarRating rating={product.rating} count={product.ratingCount} />
          <p className="text-2xl text-gray-700 mb-6">${product.price.toFixed(2)}</p>
          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">
              Luxuriously soft and incredibly warm, our premium {product.name} is crafted from the finest materials. The relaxed fit and classic design make it a versatile addition to any wardrobe.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Color: {selectedColor}</h3>
            <div className="flex space-x-2">
              <button
                className={`w-8 h-8 rounded-full bg-[#f5f5dc] border-2 ${selectedColor === 'Cream' ? 'border-primary' : 'border-gray-300'} cursor-pointer`}
                onClick={() => setSelectedColor('Cream')}
                aria-label="Cream"
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-[#36454f] border-2 ${selectedColor === 'Charcoal' ? 'border-primary' : 'border-gray-300'} cursor-pointer`}
                onClick={() => setSelectedColor('Charcoal')}
                aria-label="Charcoal"
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-[#c19a6b] border-2 ${selectedColor === 'Tan' ? 'border-primary' : 'border-gray-300'} cursor-pointer`}
                onClick={() => setSelectedColor('Tan')}
                aria-label="Tan"
              ></button>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Size</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['XS','S','M','L','XL'].map(size => (
                <button
                  key={size}
                  className={`w-12 h-12 border ${selectedSize === size ? 'border-primary bg-primary/5' : 'border-gray-300'} flex items-center justify-center text-sm font-medium rounded`}
                  onClick={() => setSelectedSize(size)}
                  aria-label={size}
                >{size}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded">
              <button className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-primary" onClick={() => setQuantity(q => Math.max(1, q-1))}>-</button>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={e => setQuantity(Math.max(1, +e.target.value))}
                className="w-12 h-12 text-center border-none focus:outline-none"
              />
              <button className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-primary" onClick={() => setQuantity(q => q+1)}>+</button>
            </div>
            <button
              className="flex-1 bg-primary text-white py-3 rounded font-medium hover:bg-primary/90 whitespace-nowrap"
              onClick={() => {
                addToCart({
                  ...product,
                  selectedColor,
                  selectedSize,
                  quantity
                })
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4 flex items-center space-x-2">
              <span className="font-medium">🚚 Free Shipping</span>
              <span className="text-sm text-gray-600 pl-2">On all orders over $100</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">🔄 Easy Returns</span>
              <span className="text-sm text-gray-600 pl-2">30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
