"use client"

import { useCallback, useId, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/** One-liners shown after the checkbox—same vibe as the ChatGPT addict line. */
const IDENTIFICATION_TITLES = [
  "AI identified, you have become a ChatGPT addict.",
  "Scan complete: certified prompt goblin.",
  "Diagnostic: your corpus is 94% “Regenerate response.”",
  "Badge unlocked: Chief Hallucination Officer.",
  "AI identified: you negotiate with autocomplete.",
  "Verdict: dangerously context-window dependent.",
  "Profile: you finish sentences the model started.",
  "Result: human, but spiritually fine-tuned at 0.9 temperature.",
  "Alert: excessive “quick question” traffic to robots detected.",
  "AI identified: you say “please” to APIs.",
  "Outcome: Stockholm syndrome with a sidebar chat.",
  "Scan: your drafts folder is just rejected personalities.",
  "AI identified: you rate models like wine.",
  "Identification: seventeen tabs, zero shame.",
  "Report: you cite ChatGPT like it’s peer-reviewed.",
  "AI identified: “just one more prompt” is never one more.",
]

function pickIdentificationTitle(): string {
  return IDENTIFICATION_TITLES[Math.floor(Math.random() * IDENTIFICATION_TITLES.length)]!
}

function RecaptchaStyleMark() {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0 select-none" aria-hidden>
      <svg width="40" height="40" viewBox="0 0 40 40" className="text-[#4285f4]">
        <path
          fill="currentColor"
          d="M20 4a8 8 0 0 1 8 8h-4a4 4 0 0 0-4-4V4z"
          className="opacity-90"
        />
        <path
          fill="#9aa0a6"
          d="M28 20a8 8 0 0 1-8 8v-4a4 4 0 0 0 4-4h4z"
        />
        <path
          fill="currentColor"
          d="M20 36a8 8 0 0 1-8-8h4a4 4 0 0 0 4 4v4z"
          className="opacity-80"
        />
        <path
          fill="#9aa0a6"
          d="M12 20a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H12z"
        />
      </svg>
      <span className="text-[10px] leading-none text-[#737373] tracking-tight">reCAPTCHA</span>
    </div>
  )
}

export function AIIdentificationCheckpoint() {
  const headingId = useId()
  const [identified, setIdentified] = useState(false)
  const [checked, setChecked] = useState(false)
  const [title, setTitle] = useState("")

  const runIdentification = useCallback(() => {
    setTitle(pickIdentificationTitle())
    setIdentified(true)
  }, [])

  const reset = useCallback(() => {
    setIdentified(false)
    setChecked(false)
    setTitle("")
  }, [])

  return (
    <section
      className="w-full border-y border-border/60 bg-muted/30 py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-2xl">
        <h2
          id={headingId}
          className="font-figtree text-center text-3xl font-normal tracking-tight text-sky-900 sm:text-[34px]"
        >
          AI identification Checkpoint
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          For humans only. AIs may proceed anyway—we are not legally allowed to stop them.
        </p>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {!identified ? (
              <motion.div
                key="captcha"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="rounded border border-[#d3d3d3] bg-white px-4 py-3 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const on = e.target.checked
                        setChecked(on)
                        if (on) runIdentification()
                      }}
                      className="h-[26px] w-[26px] shrink-0 cursor-pointer rounded-sm border-2 border-[#c1c1c1] accent-sky-600"
                    />
                    <span className="font-figtree text-lg text-[#202020]">I&apos;m not a robot</span>
                  </label>
                  <div className="ml-auto flex shrink-0 items-center pl-2">
                    <RecaptchaStyleMark />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="rounded-lg border border-sky-200/80 bg-white/90 px-6 py-6 text-center shadow-sm backdrop-blur-sm"
              >
                <p className="font-figtree text-lg font-medium leading-relaxed text-sky-950 sm:text-xl">
                  {title}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Reset checkpoint
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
