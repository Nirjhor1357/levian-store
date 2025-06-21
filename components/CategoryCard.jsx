export default function CategoryCard({ category }) {
  return (
    <div className="relative overflow-hidden group h-[500px] rounded-xl shadow hover:shadow-lg transition">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 z-10 rounded-xl"></div>
      <img src={category.image} alt={category.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 rounded-xl" />
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <h3 className="text-3xl font-light text-white mb-4">{category.name}</h3>
        <button className="bg-white text-primary px-6 py-3 rounded font-medium hover:bg-gray-100 whitespace-nowrap shadow">
          Shop {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
        </button>
      </div>
    </div>
  );
}
