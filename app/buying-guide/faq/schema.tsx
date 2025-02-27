"use client"

import Script from "next/script"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ faqItems }: { faqItems: FAQItem[] }) {
  return (
    <Script id="faq-schema" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      })}
    </Script>
  )
}

