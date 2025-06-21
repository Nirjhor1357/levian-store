import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import products from '../../data/products.json'
import categories from '../../data/categories.json'
import QuickViewModal from '../../components/QuickViewModal'

export default function ProductListPage() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState([0, 300])
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const filteredProducts = products.filter(p =>
    (categoryFilter === 'all' || p.category === categoryFilter) &&
    p.price >= priceFilter[0] &&
    p.price <= priceFilter[1]
  )

  return (
    <main>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-light mb-8 text-primary">All Products</h1>
          <div className="flex gap-8 mb-8 flex-wrap items-center">
            {/* Category Filter */}
            <div>
              <label className="mr-2 font-medium">Category:</label>
              <select
                className="border border-gray-300 rounded px-2 py-1"
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
              >
                <option value="all">All</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            {/* Price Filter */}
            <div>
              <label className="mr-2 font-medium">Price:</label>
              <input
                type="range"
                min="0"
                max="300"
                value={priceFilter[1]}
                onChange={e => setPriceFilter([0, Number(e.target.value)])}
              />
              <span className="ml-2">${priceFilter[0]} - ${priceFilter[1]}</span>
            </div>
          </div>
          {filteredProducts.length === 0
            ? <div className="text-center text-gray-400 py-24">No products found.</div>
            : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))}
              </div>
          }
          <QuickViewModal
            product={quickViewProduct}
            open={!!quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        </div>
      </section>
    </main>
  )
}
