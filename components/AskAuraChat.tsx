"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, Send, X } from "lucide-react"

type ChatRole = "user" | "assistant"

type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi — I'm **AskAura**, your guide to Auralink. Ask how the platform works, pricing, security, or integrations. You can also jump to **Pricing** or **Features** from the top navigation.",
}

function buildReply(userText: string): string {
  const q = userText.trim().toLowerCase()
  if (!q) {
    return "Type a question and I'll do my best to help."
  }

  if (/^(hi|hello|hey|good morning|good afternoon)\b/.test(q)) {
    return "Hello! Ask me anything about Auralink — product overview, pricing, data handling, or how teams use it day to day."
  }

  if (/(what is|tell me about|overview|intro).*(auralink|you)|^what is auralink|^who are you/.test(q) || (q.includes("auralink") && (q.includes("what") || q.includes("explain")))) {
    return "Auralink is an **AI intelligence layer** for modern communication: it connects calls, chats, and meetings into one place and delivers **real-time insights**, **tone and sentiment analysis**, and **team alignment** across the tools you already use."
  }

  if (/how (does|do|can|it)|work(s|ing)?|get started|onboard/.test(q)) {
    return "You **integrate Auralink** with tools like Slack, Zoom, or Microsoft Teams. It analyzes conversations as they happen so you get **actionable patterns** without replacing your stack. For next steps, use **Pricing** in the nav or ask about plans here."
  }

  if (/price|pricing|plan|cost|tier|subscription|free trial|per user/.test(q)) {
    return "Auralink offers a **free trial** and flexible tiers: **Starter** (free for small teams), **Professional** (~$29/user/month), and **Enterprise** (custom pricing with dedicated support). All plans include core **sentiment** and **real-time insight** features."
  }

  if (/security|privacy|encrypt|compliance|data|gdpr|where.*data/.test(q)) {
    return "Data is handled with **enterprise-grade security**: encryption, controls over what is analyzed, and **no resale to third parties**. Auralink is built so you stay in charge of your communication data while still getting AI-driven insights."
  }

  if (/integrat|slack|teams|zoom|microsoft|api|connect/.test(q)) {
    return "Auralink plugs into the tools teams already use — **chat**, **video**, and **voice** — so insights show up where work happens. Ask about **security** or **pricing** if you want to go deeper."
  }

  if (/tone|sentiment|emotion|language|multilingual|accuracy/.test(q)) {
    return "Auralink focuses on **tone and sentiment** across channels, with **high accuracy** in detection and **50+ languages** supported — useful for global teams and nuanced conversations."
  }

  if (/thank|thanks|thx/.test(q)) {
    return "You're welcome — happy to help anytime you have more questions about Auralink."
  }

  return "I'm a **demo assistant** on this landing page, so I answer from Auralink's public story here. Try asking about **pricing**, **security**, **integrations**, or **what Auralink does**. For detailed answers, the **FAQ** section below has longer explanations too."
}

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// @component: AskAuraChat — floating AskAura assistant for Auralink
export function AskAuraChat() {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    const el = listRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, open, scrollToBottom])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const send = useCallback(() => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg: ChatMessage = { id: newId(), role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    const replyText = buildReply(text)
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: newId(), role: "assistant", text: replyText }])
      setIsTyping(false)
    }, 450 + Math.min(400, text.length * 8))
  }, [input, isTyping])

  return (
    <div className="fixed bottom-6 right-6 z-[45] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="AskAura chat"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-[min(100vw-2rem,22rem)] max-h-[min(32rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
          >
            <header className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight text-foreground">AskAura</p>
                <p className="truncate text-xs text-muted-foreground">Ask anything about Auralink</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <MessageBody text={m.text} isUser={m.role === "user"} />
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                    <span className="inline-flex gap-1">
                      <span className="animate-pulse">●</span>
                      <span className="animate-pulse [animation-delay:150ms]">●</span>
                      <span className="animate-pulse [animation-delay:300ms]">●</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      send()
                    }
                  }}
                  placeholder="Message AskAura…"
                  className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-0 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  aria-label="Message to AskAura"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim() || isTyping}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        layout
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 items-center gap-2 rounded-full border border-border bg-primary px-4 text-primary-foreground shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close AskAura chat" : "Open AskAura chat"}
      >
        <MessageCircle className="h-6 w-6 shrink-0" strokeWidth={1.75} />
        <span className="text-sm font-semibold tracking-tight">AskAura</span>
      </motion.button>
    </div>
  )
}

/** Renders assistant text with simple **bold** segments */
function MessageBody({ text, isUser }: { text: string; isUser: boolean }) {
  if (isUser) {
    return <span className="whitespace-pre-wrap break-words">{text}</span>
  }

  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span className="whitespace-pre-wrap break-words">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}
