import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Property Search",
    description: "We help you find the perfect property that matches your criteria and budget.",
  },
  {
    title: "Legal Assistance",
    description: "Our team of legal experts will guide you through all the paperwork and legal procedures.",
  },
  {
    title: "Investment Consulting",
    description: "Get expert advice on the best investment opportunities in the Turkish real estate market.",
  },
  {
    title: "Property Management",
    description: "We offer comprehensive property management services for your investment properties.",
  },
  {
    title: "Renovation and Interior Design",
    description: "Transform your property with our renovation and interior design services.",
  },
  {
    title: "Citizenship by Investment",
    description: "We assist you in obtaining Turkish citizenship through real estate investment.",
  },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-6 h-6 text-primary mr-2" />
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need assistance with our services?</h2>
        <Button asChild>
          <Link href="/contacts">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}

