import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileText, Home, Key, PaintBucket, StampIcon as Passport } from "lucide-react"

const services = [
  {
    title: "Поиск недвижимости",
    description: "Мы поможем найти идеальную недвижимость, соответствующую вашим критериям и бюджету.",
    icon: Search,
  },
  {
    title: "Юридическое сопровождение",
    description: "Наша команда юристов проведет вас через все юридические процедуры и оформление документов.",
    icon: FileText,
  },
  {
    title: "Управление недвижимостью",
    description: "Мы предлагаем полный спектр услуг по управлению вашей недвижимостью в Турции.",
    icon: Home,
  },
  {
    title: "Послепродажное обслуживание",
    description: "Мы продолжаем поддерживать наших клиентов после завершения сделки.",
    icon: Key,
  },
  {
    title: "Ремонт и дизайн интерьера",
    description: "Наши специалисты помогут превратить вашу недвижимость в дом вашей мечты.",
    icon: PaintBucket,
  },
  {
    title: "Помощь в получении ВНЖ",
    description: "Мы оказываем поддержку в получении вида на жительство в Турции.",
    icon: Passport,
  },
]

export function ServicesSection() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <service.icon className="w-12 h-12 text-amber-500 mb-4" />
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

