import { NextResponse } from "next/server"
import { Building, Users, FileText, MessageSquare } from "lucide-react"

export async function GET() {
  // In a real application, you would fetch this data from your database
  const stats = [
    {
      name: "Total Properties",
      value: "245",
      icon: Building,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Active Users",
      value: "2,340",
      icon: Users,
      change: "+11.4%",
      changeType: "positive",
    },
    {
      name: "Blog Posts",
      value: "42",
      icon: FileText,
      change: "+6.2%",
      changeType: "positive",
    },
    {
      name: "Inquiries",
      value: "78",
      icon: MessageSquare,
      change: "+12.3%",
      changeType: "positive",
    },
  ]

  return NextResponse.json(stats)
}

