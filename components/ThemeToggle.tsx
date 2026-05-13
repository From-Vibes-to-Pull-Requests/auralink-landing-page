"use client"

import { useCallback, useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "light" | "dark"

const STORAGE_KEY = "auralink-theme"

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
  root.style.colorScheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore (private mode, etc.)
  }
}

type ThemeToggleProps = {
  className?: string
}

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(getInitialTheme())
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark"
      applyTheme(next)
      return next
    })
  }, [])

  const isDark = theme === "dark"
  const label = isDark ? "Switch to light mode" : "Switch to dark mode"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`relative inline-flex items-center h-9 rounded-full border border-border bg-background/60 backdrop-blur-md text-foreground transition-colors duration-200 hover:bg-background/90 px-1 ${className}`}
    >
      {/* Track labels */}
      <span className="flex items-center gap-1 px-2 text-xs font-medium" style={{ fontFamily: "Figtree, sans-serif" }}>
        <span
          aria-hidden
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 transition-colors duration-200 ${
            !isDark ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </span>
        <span
          aria-hidden
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 transition-colors duration-200 ${
            isDark ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </span>
      </span>
      {/* Avoid hydration mismatch: render an invisible placeholder until mounted */}
      {!mounted && <span className="sr-only">loading theme</span>}
    </button>
  )
}
