"use client"

import { ShoppingCart } from "lucide-react"

const ItemCard = ({ item, onClick, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation()
    onAddToCart()
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md card-hover cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
        {item.stock <= 5 && item.stock > 0 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Only {item.stock} left
          </div>
        )}
        {item.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of stock
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
          <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{item.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {item.category}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={item.stock === 0}
            className={`p-2 rounded-full ${
              item.stock === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
