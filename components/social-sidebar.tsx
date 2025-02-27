import Link from "next/link"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

export function SocialSidebar() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      <Link href="#" className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded transition-colors">
        <Facebook className="w-6 h-6 text-white" />
      </Link>
      <Link href="#" className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded transition-colors">
        <Instagram className="w-6 h-6 text-white" />
      </Link>
      <Link href="#" className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded transition-colors">
        <MessageCircle className="w-6 h-6 text-white" />
      </Link>
    </div>
  )
}

