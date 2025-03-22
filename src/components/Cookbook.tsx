<div className="relative h-48 w-full overflow-hidden">
  <img
    src={`/data/images/recipe stock photos/${recipe.title}.png`}
    alt={recipe.title}
    className="w-full h-full object-cover"
    onError={(e) => {
      (e.target as HTMLImageElement).src = '/placeholder-recipe.png';
    }}
  />
  <div className="absolute top-0 right-0 m-4">
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-porkchop-100 text-porkchop-800 shadow-sm">
      {recipe.difficulty}
    </span>
  </div>
</div> 