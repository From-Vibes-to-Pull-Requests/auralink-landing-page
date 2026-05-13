"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles } from "lucide-react"

type ComingSoonProps = {
  eyebrow?: string
  title?: string
  description?: string
}

export const ComingSoon = ({
  eyebrow = "Coming Soon",
  title = "Something great is on the way.",
  description = "We're hard at work on this page. Check back soon.",
}: ComingSoonProps) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background pt-32 pb-24">
      {/* Soft brand-tinted background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#156d95]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#156d95]/5 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-[#156d95]/20 bg-[#156d95]/10 px-4 py-1.5 text-sm font-medium text-[#156d95]"
          style={{ fontFamily: "Figtree, sans-serif", fontWeight: 500 }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          style={{ fontFamily: "Figtree, sans-serif", fontWeight: 600 }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-5 max-w-xl text-pretty text-base leading-7 text-[#666666] sm:text-lg"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#156d95] px-5 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:rounded-2xl hover:bg-[#156d95]/90 hover:shadow-md"
            style={{ fontFamily: "Figtree, sans-serif", fontWeight: 500 }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <a
            href="mailto:hello@auralink.com"
            className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-5 py-3 text-base font-medium text-[#202020] transition-colors duration-200 hover:border-[#202020]"
            style={{ fontFamily: "Figtree, sans-serif", fontWeight: 500 }}
          >
            <span>Get notified</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
