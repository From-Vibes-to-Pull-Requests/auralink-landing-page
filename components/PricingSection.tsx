"use client"

import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

type PlanLevel = "starter" | "pro" | "enterprise"

interface PricingFeature {
  name: string
  included: PlanLevel | "all"
}

type BillingCycle = "weekly" | "monthly" | "yearly"

interface PricingPlan {
  name: string
  level: PlanLevel
  price: {
    weekly: number
    monthly: number
    yearly: number
  }
  popular?: boolean
}

const features: PricingFeature[] = [
  { name: "Real-time conversation analysis", included: "starter" },
  { name: "Up to 10,000 messages/month", included: "starter" },
  { name: "Basic sentiment detection", included: "starter" },
  { name: "Email support", included: "starter" },
  { name: "Advanced emotional intelligence", included: "pro" },
  { name: "Up to 100,000 messages/month", included: "pro" },
  { name: "Multi-language support (50+ languages)", included: "pro" },
  { name: "Priority support", included: "pro" },
  { name: "Custom AI model training", included: "enterprise" },
  { name: "Unlimited messages", included: "enterprise" },
  { name: "Dedicated account manager", included: "enterprise" },
  { name: "24/7 phone support", included: "enterprise" },
  { name: "API access", included: "all" },
  { name: "Team collaboration tools", included: "all" },
]

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: { weekly: 7, monthly: 29, yearly: 290 },
    level: "starter",
  },
  {
    name: "Pro",
    price: { weekly: 25, monthly: 99, yearly: 990 },
    level: "pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { weekly: 75, monthly: 299, yearly: 2990 },
    level: "enterprise",
  },
]

function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel): boolean {
  if (included === "all") return true
  if (included === "enterprise" && level === "enterprise") return true
  if (included === "pro" && (level === "pro" || level === "enterprise")) return true
  if (included === "starter") return true
  return false
}

function priceForCycle(plan: PricingPlan, cycle: BillingCycle): number {
  switch (cycle) {
    case "weekly":
      return plan.price.weekly
    case "monthly":
      return plan.price.monthly
    case "yearly":
      return plan.price.yearly
  }
}

function periodLabel(cycle: BillingCycle): string {
  switch (cycle) {
    case "weekly":
      return "week"
    case "monthly":
      return "month"
    case "yearly":
      return "year"
  }
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = React.useState<BillingCycle>("monthly")
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>("pro")

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-figtree text-[40px] font-normal leading-tight mb-4 text-sky-800">Choose Your Plan</h2>
          <p className="font-figtree text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with Auralink's communication intelligence platform. All plans include API access and team
            collaboration.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center items-center gap-2 bg-sky-100 rounded-full p-1 max-w-full">
            <button
              type="button"
              onClick={() => setBillingCycle("weekly")}
              className={cn(
                "px-5 sm:px-6 py-2 rounded-full font-figtree text-lg transition-all",
                billingCycle === "weekly"
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-amber-100/80",
              )}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-5 sm:px-6 py-2 rounded-full font-figtree text-lg transition-all",
                billingCycle === "monthly"
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-amber-100/80",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-5 sm:px-6 py-2 rounded-full font-figtree text-lg transition-all",
                billingCycle === "yearly"
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-amber-100/80",
              )}
            >
              Yearly
              <span className="ml-2 text-sm text-orange-600 font-medium">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.level)}
              className={cn(
                "relative p-8 rounded-2xl text-left transition-all border-2",
                selectedPlan === plan.level
                  ? "border-sky-500 bg-sky-100/60"
                  : "border-border hover:border-sky-300 hover:bg-amber-50/50",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-slate-900 px-4 py-1 rounded-full text-sm font-figtree font-medium">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="font-figtree text-2xl font-medium mb-2 text-sky-800">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-figtree text-4xl font-medium">${priceForCycle(plan, billingCycle)}</span>
                  <span className="font-figtree text-lg text-muted-foreground">/{periodLabel(billingCycle)}</span>
                </div>
              </div>
              <div
                className={cn(
                  "w-full py-3 px-6 rounded-full font-figtree text-lg transition-all text-center",
                  selectedPlan === plan.level ? "bg-amber-400 text-slate-900" : "bg-sky-100 text-slate-800",
                )}
              >
                {selectedPlan === plan.level ? "Selected" : "Select Plan"}
              </div>
            </button>
          ))}
        </div>

        {/* Features Table */}
        <div className="border border-border rounded-2xl overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <div className="min-w-[768px]">
              {/* Table Header */}
              <div className="flex items-center p-6 bg-secondary border-b border-border">
                <div className="flex-1">
                  <h3 className="font-figtree text-xl font-medium text-sky-800">Features</h3>
                </div>
                <div className="flex items-center gap-8">
                  {plans.map((plan) => (
                    <div key={plan.level} className="w-24 text-center font-figtree text-lg font-medium">
                      {plan.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Rows */}
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={cn(
                    "flex items-center p-6 transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-secondary/30",
                    feature.included === selectedPlan && "bg-sky-100/80",
                  )}
                >
                  <div className="flex-1">
                    <span className="font-figtree text-lg">{feature.name}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    {plans.map((plan) => (
                      <div key={plan.level} className="w-24 flex justify-center">
                        {shouldShowCheck(feature.included, plan.level) ? (
                          <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                            <CheckIcon className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-[18px] py-[15px] rounded-full font-figtree text-lg font-medium hover:rounded-2xl transition-all shadow-sm">
            Get started with {plans.find((p) => p.level === selectedPlan)?.name}
          </button>
        </div>
      </div>
    </section>
  )
}
