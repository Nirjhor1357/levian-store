import { useState, useContext, useEffect } from 'react'
import { CartContext } from './CartContext'
import { motion, AnimatePresence } from "framer-motion";
import StarRating from './StarRating';

export default function QuickViewModal({ product, open, onClose }) {
  const { addToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Cream')

  useEffect(() => {
    if (open) {
      setQuantity(1)
      setSelectedSize('M')
      setSelectedColor('Cream')
    }
  }, [open])

  if (!product) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative"
          >
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-primary text-2xl"
              aria-label="Close"
              onClick={onClose}
            >×</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={product.image} alt={product.name} className="w-full h-[350px] object-cover rounded-lg" />
              <div>
                <h2 className="text-2xl font-light text-primary mb-1">{product.name}</h2>
                <StarRating rating={product.rating} count={product.ratingCount} />
                <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
                {/* Color Selection */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Color: {selectedColor}</h3>
                  <div className="flex space-x-2">
                    <button
                      className={`w-8 h-8 rounded-full bg-[#f5f5dc] border-2 ${selectedColor === 'Cream' ? 'border-primary' : 'border-gray-300'}`}
                      onClick={() => setSelectedColor('Cream')}
                      aria-label="Cream"
                    ></button>
                    <button
                      className={`w-8 h-8 rounded-full bg-[#36454f] border-2 ${selectedColor === 'Charcoal' ? 'border-primary' : 'border-gray-300'}`}
                      onClick={() => setSelectedColor('Charcoal')}
                      aria-label="Charcoal"
                    ></button>
                    <button
                      className={`w-8 h-8 rounded-full bg-[#c19a6b] border-2 ${selectedColor === 'Tan' ? 'border-primary' : 'border-gray-300'}`}
                      onClick={() => setSelectedColor('Tan')}
                      aria-label="Tan"
                    ></button>
                  </div>
                </div>
                {/* Size Selection */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                      <button
                        key={size}
                        className={`w-10 h-10 border ${selectedSize === size ? 'border-primary bg-primary/5' : 'border-gray-300'} flex items-center justify-center text-sm font-medium rounded`}
                        onClick={() => setSelectedSize(size)}
                        aria-label={size}
                      >{size}</button>
                    ))}
                  </div>
                </div>
                {/* Quantity and Add to Cart */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      className="w-8 h-10 flex items-center justify-center text-gray-500 hover:text-primary"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >-</button>
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={e => setQuantity(Math.max(1, +e.target.value))}
                      className="w-10 h-10 text-center border-none focus:outline-none"
                    />
                    <button
                      className="w-8 h-10 flex items-center justify-center text-gray-500 hover:text-primary"
                      onClick={() => setQuantity(q => q + 1)}
                    >+</button>
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
                      onClose()
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Luxuriously soft and incredibly warm, our premium {product.name} is crafted from the finest materials.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
