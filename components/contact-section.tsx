import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle } from "lucide-react"

export function ContactSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Появились вопросы?</h2>
        <p className="text-gray-600 mb-8">
          Закажите консультацию у опытных менеджеров, которые помогут Вам во всех вопросах
        </p>

        <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Ирем Эрдинч"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-1">Ирем Эрдинч</h3>
            <p className="text-gray-500 mb-4">Специалист по недвижимости</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>+90 (544) 315 43 51</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>info@turqaestate.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <span>WhatsApp</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button>Заказать звонок</Button>
              <Button variant="outline">Задать вопрос</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

