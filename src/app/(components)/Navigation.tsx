'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionSettings } from '@/hooks/useMotionSettings'

/**
 * Navigation component
 * Sticky navigation with glass morphism effect
 * Shows/hides based on scroll direction
 */
export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { reduceMotion } = useMotionSettings()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#technologies', label: 'Tech' },
    { href: '#works', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: reduceMotion ? 1 : 1.05 }}
                className="text-2xl font-bold text-white cursor-pointer"
              >
                <span className="text-primary-400">A</span>N
              </motion.div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-6 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

