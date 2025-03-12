"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertySearchForm } from "@/components/property-search-form"
import { FeaturedProperties } from "@/components/featured-properties"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Luxury Property"
            fill
            priority
            className="object-cover brightness-75"
          />
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Find Your Dream Home in Turkey
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover luxury properties in the most beautiful locations across Turkey
            </p>
            <PropertySearchForm />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="/images/about-us.jpg"
                alt="About Turqa Estate"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#003366] mb-4">About Turqa Estate</h2>
              <p className="text-gray-600 mb-6">
                Turqa Estate is a premier real estate agency specializing in luxury properties across Turkey. With years of experience and deep local knowledge, we help our clients find their perfect home or investment opportunity.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of experienced professionals is dedicated to providing exceptional service and guidance throughout the entire buying process, from property selection to legal matters and beyond.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}

