import { useState, useEffect } from 'react';
import API from '../utils/api'; // API helper as described above
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import QuickViewModal from '../components/QuickViewModal';
import categories from '../data/categories.json';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState([0, 300]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from backend on load
  useEffect(() => {
    setLoading(true);
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => setError(err.response?.data?.error || 'Could not fetch products.'))
      .finally(() => setLoading(false));
  }, []);

  // Filtering logic (category + price)
  const filteredProducts = products.filter(p =>
    (categoryFilter === 'all' ||
      (p.category && (
        p.category._id === categoryFilter ||
        p.category === categoryFilter ||
        p.category.name === categoryFilter
      ))
    ) &&
    p.price >= priceFilter[0] &&
    p.price <= priceFilter[1]
  );

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent z-10"></div>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('https://readdy.ai/api/search-image?query=high-end%20fashion%20photography%20with%20a%20stylish%20female%20model%20wearing%20elegant%20minimalist%20clothing%2C%20standing%20in%20a%20modern%20studio%20with%20soft%20lighting%2C%20professional%20fashion%20photography%20with%20clean%20background%2C%20high%20contrast%2C%20commercial%20quality%2C%20fashion%20editorial%20style%2C%20premium%20clothing%20brand&width=1920&height=1080&seq=1&orientation=landscape')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 px-8 md:px-16 w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-light mb-4 text-primary">Spring Collection 2025</h1>
            <p className="text-lg md:text-xl font-light mb-8 text-gray-700">
              Discover the perfect blend of comfort and style with our latest collection designed for the modern individual.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded font-medium hover:bg-primary/90 whitespace-nowrap">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto mb-6 flex flex-wrap items-center justify-between gap-4">
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
        <div>
          <label className="mr-2 font-medium">Price:</label>
          <input
            type="range"
            min="0"
            max="300"
            value={priceFilter[1]}
            onChange={e => setPriceFilter([0, Number(e.target.value)])}
            className="align-middle"
          />
          <span className="ml-2">${priceFilter[0]} - ${priceFilter[1]}</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-light text-center mb-12 text-primary">Featured Products</h2>
          {loading && (
            <div className="text-center py-12 text-gray-400">Loading products...</div>
          )}
          {error && (
            <div className="text-center py-12 text-red-500">{error}</div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.length === 0
                ? <div className="col-span-4 text-center text-gray-400 py-12">No products found.</div>
                : filteredProducts.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))
              }
            </div>
          )}
          <QuickViewModal
            product={quickViewProduct}
            open={!!quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-light text-center mb-12 text-primary">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
