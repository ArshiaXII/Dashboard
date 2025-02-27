import Head from "next/head"
import { PropertyHeroWrapper } from "@/components/property-hero-wrapper"
import { IntroductionSection } from "@/components/introduction-section"
import { PopularLocations } from "@/components/popular-locations"
import { HighlightedInfo } from "@/components/highlighted-info"
import { NewAddedPropertiesSection } from "@/components/new-added-properties-section"
import { PopularPropertiesSection } from "@/components/popular-properties-section"
import { MostVisitedPropertiesSection } from "@/components/most-visited-properties-section"
import { NewsArticles } from "@/components/news-articles"
import { SpecialOfferSection } from "@/components/special-offer-section"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Turqa Estate | Premium Turkish Real Estate</title>
        <meta
          name="description"
          content="Discover luxury properties in Turkey with Turqa Estate. Expert guidance for buying, selling, and investing in Turkish real estate. Find your dream home today!"
        />
        <meta name="keywords" content="luxury real estate, Turkey, premium properties, investment, Turqa Estate" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen">
        <PropertyHeroWrapper />
        <main>
          <IntroductionSection />
          <PopularLocations />
          <HighlightedInfo />
          <NewAddedPropertiesSection />
          <PopularPropertiesSection />
          <MostVisitedPropertiesSection />
          <SpecialOfferSection />
          <NewsArticles />
        </main>
      </div>
    </>
  )
}

