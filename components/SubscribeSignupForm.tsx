"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"

// @component: SubscribeSignupForm — demo signup (no backend)
export function SubscribeSignupForm() {
  const [email, setEmail] = useState("")
  const [newsletter, setNewsletter] = useState(true)
  const [ceoRead, setCeoRead] = useState(true)
  const [productPulse, setProductPulse] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || status === "loading") return
    setStatus("loading")
    window.setTimeout(() => {
      setStatus("done")
      setEmail("")
    }, 900)
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#e5e5e5] bg-white p-8 text-center shadow-sm"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#156d95]/10 text-[#156d95]">
          <Check className="h-6 w-6" strokeWidth={2} />
        </div>
        <p className="text-lg font-medium text-[#202020]" style={{ fontFamily: "Figtree" }}>
          You are on the list
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#666666]" style={{ fontFamily: "Figtree" }}>
          This page is a demo—no email was sent. Wire this form to your ESP or API when you are ready.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[#156d95] hover:underline"
          style={{ fontFamily: "Figtree" }}
        >
          Subscribe another address
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#e5e5e5] bg-white p-8 shadow-sm"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#202020]" style={{ fontFamily: "Figtree" }}>
          Work email
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#202020] outline-none transition-colors placeholder:text-[#9a9a9a] focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20"
          style={{ fontFamily: "Figtree" }}
        />
      </label>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-[#202020]" style={{ fontFamily: "Figtree" }}>
          What would you like to receive?
        </legend>
        <ul className="mt-3 space-y-3">
          <li className="flex items-start gap-3">
            <input
              id="opt-newsletter"
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#156d95] focus:ring-[#156d95]"
            />
            <label htmlFor="opt-newsletter" className="text-sm leading-snug text-[#666666]" style={{ fontFamily: "Figtree" }}>
              <span className="font-medium text-[#202020]">Auralink Weekly</span> — product news, customer stories, and communication intelligence tips (most Thursdays).
            </label>
          </li>
          <li className="flex items-start gap-3">
            <input
              id="opt-ceo"
              type="checkbox"
              checked={ceoRead}
              onChange={(e) => setCeoRead(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#156d95] focus:ring-[#156d95]"
            />
            <label htmlFor="opt-ceo" className="text-sm leading-snug text-[#666666]" style={{ fontFamily: "Figtree" }}>
              <span className="font-medium text-[#202020]">CEO Read</span> — a short letter on where we are heading, what we are learning from teams, and what is next (twice monthly).
            </label>
          </li>
          <li className="flex items-start gap-3">
            <input
              id="opt-product"
              type="checkbox"
              checked={productPulse}
              onChange={(e) => setProductPulse(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#156d95] focus:ring-[#156d95]"
            />
            <label htmlFor="opt-product" className="text-sm leading-snug text-[#666666]" style={{ fontFamily: "Figtree" }}>
              <span className="font-medium text-[#202020]">Product Pulse</span> — release notes, API changes, and early access invites (only when there is something worth your inbox).
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        type="submit"
        disabled={status === "loading" || (!newsletter && !ceoRead && !productPulse)}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#156d95] py-3.5 text-base font-semibold text-white transition-all hover:bg-[#156d95]/90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ fontFamily: "Figtree", fontWeight: "500" }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Joining…
          </>
        ) : (
          "Subscribe"
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-[#9a9a9a]" style={{ fontFamily: "Figtree" }}>
        By subscribing you agree to hear from Auralink about these topics. Unsubscribe anytime—we respect your attention.
      </p>
    </motion.form>
  )
}
