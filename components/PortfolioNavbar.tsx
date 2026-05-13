"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navigationLinks = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Resources", href: "/#resources" },
  { name: "Subscribe", href: "/subscribe" },
] as const

// @component: PortfolioNavbar
export const PortfolioNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const linkClass =
    "text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors duration-200 relative group inline-block"
  const linkStyle = { fontFamily: "Figtree, sans-serif", fontWeight: "400" } as const

  // @return
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              <span
                style={{
                  fontFamily: "Figtree",
                  fontWeight: "800",
                }}
              >
                Auralink
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={linkClass}
                  style={linkStyle}
                >
                  <span>{link.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="bg-[#156d95] text-white px-[18px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200 hover:rounded-2xl shadow-sm hover:shadow-md whitespace-nowrap leading-4 py-[15px] inline-block"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              <span
                style={{
                  fontFamily: "Figtree",
                  fontWeight: "500",
                }}
              >
                Start Free Trial
              </span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Link
                  href="/#contact"
                  onClick={closeMobileMenu}
                  className="block w-full text-center bg-[#156d95] text-white px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  <span>Start Free Trial</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
