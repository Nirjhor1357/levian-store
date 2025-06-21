import StarRating from './StarRating';

export default function ProductCard({ product, onQuickView }) {
  return (
    <div className="product-card group relative rounded-xl shadow hover:shadow-lg transition">
      <div className="relative overflow-hidden mb-4 rounded-xl">
        <img src={product.image} alt={product.name} className="w-full h-[400px] object-cover object-top" />
        <div className="quick-view opacity-0 absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100">
          <button
            className="bg-white text-primary px-6 py-2 rounded font-medium hover:bg-gray-100 whitespace-nowrap"
            onClick={() => onQuickView && onQuickView(product)}
          >
            Quick View
          </button>
        </div>
      </div>
      <h3 className="text-lg font-medium text-primary">{product.name}</h3>
      <StarRating rating={product.rating} count={product.ratingCount} />
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
    </div>
  );
}
