import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { AIIdentificationCheckpoint } from "@/components/AIIdentificationCheckpoint"
import { PricingSection } from "@/components/PricingSection"
import { FAQSection } from "@/components/FAQSection"
import { Footer } from "@/components/Footer"
import { AskAuraChat } from "@/components/AskAuraChat"

export default function Page() {
  return (
    <>
      <PortfolioNavbar />
      <div id="home" className="scroll-mt-24">
        <ProductTeaserCard />
      </div>
      <div id="features" className="scroll-mt-24">
        <BankingScaleHero />
        <AIIdentificationCheckpoint />
      </div>
      <div id="solutions" className="scroll-mt-24">
        <CaseStudiesCarousel />
        <IntegrationCarousel />
      </div>
      <div id="pricing" className="scroll-mt-24">
        <PricingSection />
      </div>
      <div id="resources" className="scroll-mt-24">
        <FAQSection />
      </div>
      <div id="contact" className="scroll-mt-24">
        <Footer />
      </div>
      <AskAuraChat />
    </>
  )
}
