import type { Metadata } from "next"
import Link from "next/link"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { AskAuraChat } from "@/components/AskAuraChat"
import { SubscribeSignupForm } from "@/components/SubscribeSignupForm"
import { Mail, Sparkles, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Subscribe | Auralink",
  description:
    "Subscribe to the Auralink Weekly newsletter, CEO Read, and product updates. Curated perspectives on communication intelligence.",
}

const offerings = [
  {
    title: "Auralink Weekly",
    icon: Mail,
    cadence: "Weekly · Thursdays",
    body: "Field notes from teams using the intelligence layer: tone and sentiment trends, rollout playbooks, and one practical idea you can try with your team the same day.",
  },
  {
    title: "CEO Read",
    icon: BookOpen,
    cadence: "Twice monthly",
    body: "A concise letter from our CEO on strategy, customer lessons, and where communication AI is heading—written for leaders who want signal, not hype.",
  },
  {
    title: "Product Pulse",
    icon: Sparkles,
    cadence: "Occasional",
    body: "Shipped features, API notes, security and compliance updates, and invites to betas. We only send this when there is something material for operators and builders.",
  },
] as const

export default function SubscribePage() {
  return (
    <>
      <PortfolioNavbar />
      <main className="min-h-screen bg-[#fafafa] pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="mb-10 text-sm text-[#666666]" style={{ fontFamily: "Figtree" }}>
            <Link href="/" className="hover:text-[#202020]">
              Home
            </Link>
            <span className="mx-2 text-[#c4c4c4]">/</span>
            <span className="text-[#202020]">Subscribe</span>
          </nav>

          <header className="max-w-3xl">
            <h1
              className="text-4xl font-normal tracking-tight text-[#202020] sm:text-5xl"
              style={{ fontFamily: "Figtree", fontWeight: "400" }}
            >
              Stay close to the conversation
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#666666]" style={{ fontFamily: "Figtree" }}>
              Subscribe to briefings built for people who care about how teams communicate—not generic marketing blasts. Pick
              the streams that match how you follow Auralink.
            </p>
          </header>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-[#202020]" style={{ fontFamily: "Figtree" }}>
                What you can sign up for
              </h2>
              <ul className="mt-6 space-y-8">
                {offerings.map(({ title, icon: Icon, cadence, body }) => (
                  <li key={title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#e5e5e5] bg-white text-[#156d95]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-[#202020]" style={{ fontFamily: "Figtree" }}>
                        {title}
                      </p>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#9a9a9a]" style={{ fontFamily: "Figtree" }}>
                        {cadence}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#666666]" style={{ fontFamily: "Figtree" }}>
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <p className="text-sm font-medium text-[#202020]" style={{ fontFamily: "Figtree" }}>
                  Prefer the full picture first?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#666666]" style={{ fontFamily: "Figtree" }}>
                  Explore the product story, pricing, and FAQs on the home page, then come back here when you are ready for
                  updates in your inbox.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-flex text-sm font-semibold text-[#156d95] hover:underline"
                  style={{ fontFamily: "Figtree" }}
                >
                  Back to Auralink home
                </Link>
              </div>
            </div>

            <div>
              <SubscribeSignupForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AskAuraChat />
    </>
  )
}
