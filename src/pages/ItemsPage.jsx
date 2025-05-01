"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search, X, ShoppingCart } from "lucide-react"
import ItemCard from "../components/ItemCard"
import ItemModal from "../components/ItemModal"
import toast from "react-hot-toast"

const ItemsPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/item")
      setItems(response.data.payload)
      setError(null)
    } catch (err) {
      console.error("Error fetching items:", err)
      setError("Failed to load items. Please try again later.")

      // Load sample data if API fails
      setItems(sampleItems)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
    })
    setSearchQuery("")
  }

  const openItemModal = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeItemModal = () => {
    setIsModalOpen(false)
  }

  const addToCart = (item) => {
    toast.success(`${item.name} added to cart!`)
    // Implement cart functionality here
  }

  // Filter and sort items
  const filteredItems = items
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !filters.category || item.category === filters.category

      const matchesPrice =
        (!filters.minPrice || item.price >= Number.parseFloat(filters.minPrice)) &&
        (!filters.maxPrice || item.price <= Number.parseFloat(filters.maxPrice))

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "priceAsc":
          return a.price - b.price
        case "priceDesc":
          return b.price - a.price
        case "nameAsc":
          return a.name.localeCompare(b.name)
        case "nameDesc":
          return b.name.localeCompare(a.name)
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

  // Get unique categories for filter dropdown
  const categories = [...new Set(items.map((item) => item.category))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Discover Elegant Products</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Browse our curated collection of high-quality items designed to elevate your lifestyle.
          </p>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10 py-3"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
              <button onClick={clearFilters} className="text-sm text-primary hover:text-primary/80 flex items-center">
                <X className="h-4 w-4 mr-1" /> Clear
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select name="category" value={filters.category} onChange={handleFilterChange} className="input-field">
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="input-field w-full"
                    min="0"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="input-field w-full"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="input-field">
                  <option value="newest">Newest</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="nameAsc">Name: A to Z</option>
                  <option value="nameDesc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">{error}</div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              <button onClick={clearFilters} className="mt-4 btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => openItemModal(item)}
                    onAddToCart={() => addToCart(item)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={closeItemModal}
          item={selectedItem}
          onAddToCart={() => addToCart(selectedItem)}
        />
      )}
    </div>
  )
}

// Sample data for demo purposes
const sampleItems = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    description:
      "Handcrafted genuine leather wallet with multiple card slots and a coin pocket. Perfect for everyday use.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    stock: 15,
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    description:
      "Elegant minimalist watch with a stainless steel case and genuine leather strap. Water-resistant up to 30 meters.",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Watches",
    stock: 8,
    createdAt: "2023-06-20T14:45:00Z",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description:
      "High-quality wireless earbuds with active noise cancellation and up to 24 hours of battery life with the charging case.",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 20,
    createdAt: "2023-07-05T09:15:00Z",
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug",
    description:
      "Handmade ceramic coffee mug with a comfortable handle and elegant design. Microwave and dishwasher safe.",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home",
    stock: 30,
    createdAt: "2023-07-10T11:20:00Z",
  },
  {
    id: 5,
    name: "Leather Messenger Bag",
    description:
      "Stylish leather messenger bag with multiple compartments and adjustable shoulder strap. Perfect for work or travel.",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bags",
    stock: 12,
    createdAt: "2023-08-02T16:30:00Z",
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    description:
      "Double-walled stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home",
    stock: 25,
    createdAt: "2023-08-15T13:45:00Z",
  },
]

export default ItemsPage
