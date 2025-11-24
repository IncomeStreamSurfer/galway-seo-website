'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-darker/90 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">Kraft Agency</span>
                <p className="text-xs text-gray-400 hidden sm:block">Craftspeople in a digital sense</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/locations" className="text-gray-300 hover:text-white transition">Locations</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
              <Link href="/contact" className="btn-primary text-white px-6 py-2 rounded-lg font-semibold">Get Started</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-darker border-l border-white/10 md:hidden transition-transform duration-300 z-50 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white mb-8"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="flex flex-col space-y-4">
            <Link href="/services" className="text-gray-300 hover:text-white transition" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/locations" className="text-gray-300 hover:text-white transition" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="btn-primary text-white px-6 py-3 rounded-lg font-semibold text-center" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}
