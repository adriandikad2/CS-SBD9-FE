import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Complete Catalogue</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your one-stop shop for varying and high-quality products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Complete Catalogue (CC). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
