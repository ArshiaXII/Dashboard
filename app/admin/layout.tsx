import { ProtectedRoute } from "@/components/ProtectedRoute"

export const metadata = {
  title: "Turqa Estate - Admin Dashboard",
  description: "Manage luxury real estate listings, blog posts, and site content for Turqa Estate.",
  keywords: "real estate, luxury properties, admin panel, turqa estate, dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}

