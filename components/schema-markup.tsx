export function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "TurqaEstate",
          description: "Premium Real Estate Agency in Turkey",
          url: "https://www.turqaestate.com",
          logo: "https://www.turqaestate.com/logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Real Estate Street",
            addressLocality: "Antalya",
            addressRegion: "Antalya",
            postalCode: "07100",
            addressCountry: "TR",
          },
          telephone: "+90 (544) 315 43 51",
          email: "info@turqaestate.com",
          sameAs: [
            "https://www.facebook.com/turqaestate",
            "https://www.instagram.com/turqaestate",
            "https://www.linkedin.com/company/turqaestate",
          ],
        }),
      }}
    />
  )
}

