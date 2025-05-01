"use client"

import { useState } from "react"
import { X, Minus, Plus, ShoppingCart } from "lucide-react"

const ItemModal = ({ isOpen, onClose, item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)

  if (!isOpen || !item) return null

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < item.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    onAddToCart(quantity)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 md:h-auto bg-gray-200 dark:bg-gray-700">
              <img
                src={item.image_url || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                <p className="text-3xl font-bold text-primary">${item.price.toFixed(2)}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.stock} {item.stock === 1 ? "item" : "items"} available
                  </span>
                </div>

                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md w-32">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={increaseQuantity}
                    disabled={quantity >= item.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  type="button"
                  className="btn-primary py-3 flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={item.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button type="button" className="btn-secondary py-3" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
