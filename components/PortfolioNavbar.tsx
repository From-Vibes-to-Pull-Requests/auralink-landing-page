"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Mail } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

type NavLink = {
  name: string
  href: string
  type?: "anchor" | "route"
  dropdown?: {
    message: string
    email: string
  }
}

const navigationLinks: NavLink[] = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Solutions", href: "#solutions" },
  { name: "Resources", href: "#resources" },
  { name: "About Us", href: "/about", type: "route" },
  {
    name: "Contact Us",
    href: "#contact",
    dropdown: {
      message: "Need help? Reach us at",
      email: "xyz@gmail.com",
    },
  },
]

// @component: PortfolioNavbar
export const PortfolioNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLinkClick = (href: string, type: NavLink["type"] = "anchor") => {
    closeMobileMenu()
    setOpenDropdown(null)
    if (type === "route") {
      router.push(href)
      return
    }
    if (pathname !== "/") {
      router.push(`/${href}`)
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLogoClick = () => {
    closeMobileMenu()
    setOpenDropdown(null)
    if (pathname !== "/") {
      router.push("/")
      return
    }
    const element = document.querySelector("#home")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  const handleNavItemClick = (link: NavLink) => {
    if (link.dropdown) {
      setOpenDropdown(openDropdown === link.name ? null : link.name)
      return
    }
    handleLinkClick(link.href, link.type ?? "anchor")
  }

  // @return
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold text-sky-600 hover:text-sky-700 transition-colors duration-200"
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
                Neurolink
              </span>
            </button>
          </div>

          <div className="hidden md:block" ref={dropdownRef}>
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <div key={link.name} className="relative">
                  <button
                    onClick={() => handleNavItemClick(link)}
                    className="text-slate-700 hover:text-orange-600 px-3 py-2 text-base font-medium transition-colors duration-200 relative group rounded-lg hover:bg-amber-100/60"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    <span>{link.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></div>
                  </button>
                  <AnimatePresence>
                    {link.dropdown && openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 z-50"
                      >
                        <p className="text-sm text-[#404040] mb-2" style={{ fontFamily: "Figtree, sans-serif" }}>
                          {link.dropdown.message}
                        </p>
                        <a
                          href={`mailto:${link.dropdown.email}`}
                          className="flex items-center gap-2 text-[#156d95] font-semibold text-sm hover:underline"
                          style={{ fontFamily: "Figtree, sans-serif" }}
                        >
                          <Mail className="w-4 h-4" />
                          {link.dropdown.email}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => handleLinkClick("#contact", "anchor")}
              className="bg-amber-400 text-slate-900 px-[18px] rounded-full text-base font-semibold hover:bg-amber-500 transition-all duration-200 hover:rounded-2xl shadow-sm hover:shadow-md whitespace-nowrap leading-4 py-[15px]"
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
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-700 hover:text-orange-600 p-2 rounded-md transition-colors duration-200 hover:bg-amber-100/70"
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
                <div key={link.name}>
                  <button
                    onClick={() => handleNavItemClick(link)}
                    className="block w-full text-left text-slate-700 hover:text-orange-600 py-3 text-lg font-medium transition-colors duration-200 rounded-lg hover:bg-amber-100/50"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    <span>{link.name}</span>
                  </button>
                  <AnimatePresence>
                    {link.dropdown && openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden pl-3 pb-2"
                      >
                        <p className="text-sm text-[#404040] mb-1" style={{ fontFamily: "Figtree, sans-serif" }}>
                          {link.dropdown.message}
                        </p>
                        <a
                          href={`mailto:${link.dropdown.email}`}
                          className="flex items-center gap-2 text-[#156d95] font-semibold text-sm hover:underline"
                          style={{ fontFamily: "Figtree, sans-serif" }}
                        >
                          <Mail className="w-4 h-4" />
                          {link.dropdown.email}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => handleLinkClick("#contact", "anchor")}
                  className="w-full bg-amber-400 text-slate-900 px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-amber-500 transition-all duration-200"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  <span>Start Free Trial</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
