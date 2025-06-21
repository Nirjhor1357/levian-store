export default function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1 mb-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="20" height="20" fill={i < rating ? '#FFD700' : '#E5E5E5'}>
          <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
        </svg>
      ))}
      <span className="ml-2 text-sm text-gray-600">({count})</span>
    </div>
  )
}
