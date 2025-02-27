import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PropertyCard({ property }) {
  return (
    <Card>
      <CardHeader>
        <Image src={property.image || "/placeholder.svg"} alt={property.title} width={300} height={200} />
        <CardTitle>{property.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Price: ${property.price.toLocaleString()}</p>
        <p>Location: {property.location}</p>
      </CardContent>
      <CardFooter>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  )
}

