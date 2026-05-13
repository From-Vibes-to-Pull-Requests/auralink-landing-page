import type { Metadata } from "next"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { ComingSoon } from "@/components/ComingSoon"

export const metadata: Metadata = {
  title: "About Us · Coming Soon | Auralink",
  description:
    "We're putting the finishing touches on our story. The Auralink About page is coming soon.",
}

export default function AboutPage() {
  return (
    <>
      <PortfolioNavbar />
      <ComingSoon
        eyebrow="About Us"
        title="Our story is being written."
        description="We're putting the finishing touches on the people, mission, and ideas behind Auralink. Check back soon — there's a lot we can't wait to share."
      />
      <Footer />
    </>
  )
}
