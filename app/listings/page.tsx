import Head from "next/head";
import { PropertyFilters } from "@/components/property-filters"
import { PropertyGrid } from "@/components/property-grid"
import { Pagination } from "@/components/ui/pagination"

export default function ListingsPage() {
  return (
    <>
      <Head>
        <title>Turqa Estate - Listings</title>
        <meta name="description" content="Explore our property listings." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Property Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <PropertyFilters />
          </aside>
          <main className="md:col-span-3">
            <PropertyGrid />
            <div className="mt-8">
              <Pagination />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

