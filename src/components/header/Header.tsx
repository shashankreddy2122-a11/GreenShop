import { Search, ShoppingCart, LogIn, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import AuthPopup from './AuthPopup'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false)
  const { count } = useCart()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blogs', path: '/blog' },
  ]

  return (
    <header className="bg-white text-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/assets/l.png"
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-green-600">Greenshop</span>
          </div>

          {/* Center - Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-900 hover:text-green-600 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900">
              <Search className="w-5 h-5" />
            </button>
            <Link
  to="/cart"
  aria-label={`Cart, ${count} items`}
  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900"
>
  <ShoppingCart className="w-5 h-5" />
  {count > 0 && (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-semibold text-white">
      {count}
    </span>
  )}
</Link>
            <button
              onClick={() => setIsAuthPopupOpen(true)}
              className="hidden sm:flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-white"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-900 hover:text-green-600 transition-colors font-medium py-2 text-left"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsAuthPopupOpen(true)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-white w-fit sm:hidden"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </button>
            </div>
          </nav>
        )}
      </div>
      <AuthPopup isOpen={isAuthPopupOpen} onClose={() => setIsAuthPopupOpen(false)} />
    </header>
  )
}

export default Header
