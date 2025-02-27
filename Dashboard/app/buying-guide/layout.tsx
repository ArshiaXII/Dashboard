import type { Metadata } from "next"
import Script from "next/script"
import type React from "react" // Import React

export const metadata: Metadata = {
  title: "Buying Guide FAQ | TurqaEstate",
  description:
    "Find answers to the most common questions about buying property in Turkey. Expert advice on the Turkish real estate market, legal procedures, and more.",
  openGraph: {
    title: "Buying Guide FAQ | TurqaEstate",
    description:
      "Find answers to the most common questions about buying property in Turkey. Expert advice on the Turkish real estate market, legal procedures, and more.",
    images: [
      {
        url: "https://www.turqaestate.com/images/buying-guide-faq.jpg",
        width: 1200,
        height: 630,
        alt: "TurqaEstate Buying Guide FAQ",
      },
    ],
  },
}

export default function BuyingGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `}
      </Script>
    </>
  )
}

