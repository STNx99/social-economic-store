import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import {Command,CommandInput } from './ui/command'
import { cn } from '@/lib/utils'

export default function Header() {
  const [activeNav, setActiveNav] = useState<string>('Home')
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
              onClick={() => setActiveNav('Home')}
              className={cn(
                "text-gray-700 hover:text-gray-900 transition-colors pb-1 relative",
                activeNav === 'Home' && 'text-gray-900'
              )}
            >
              Home
              {activeNav === 'Home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
              )}
            </Link>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                setActiveNav('Contact')
              }}
              className={cn(
                "text-gray-700 hover:text-gray-900 transition-colors pb-1 relative",
                activeNav === 'Contact' && 'text-gray-900'
              )}
            >
              Contact
              {activeNav === 'Contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
              )}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                setActiveNav('About')
              }}
              className={cn(
                "text-gray-700 hover:text-gray-900 transition-colors pb-1 relative",
                activeNav === 'About' && 'text-gray-900'
              )}
            >
              About
              {activeNav === 'About' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
              )}
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
