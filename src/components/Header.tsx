import { Link } from '@tanstack/react-router'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import {
  Command,
  CommandInput,
} from './ui/command'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Social e-commerce
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              activeProps={{
                className: 'text-gray-900 underline underline-offset-4',
              }}
            >
              Home
            </Link>
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center gap-4">
            <div className="w-[280px]">
              <Command className="rounded-lg border border-gray-300 shadow-sm">
                <CommandInput placeholder="What are you looking for?" />
              </Command>
            </div>
            <div className="flex items-center gap-3">
              <Button className="text-gray-700 hover:text-gray-900 transition-colors">
                <Heart size={24} />
              </Button>
              <Button className="text-gray-700 hover:text-gray-900 transition-colors">
                <ShoppingCart size={24} />
              </Button>
              <Link to="/auth/register">
                <Button className="bg-red-500 hover:bg-red-600 px-8">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
