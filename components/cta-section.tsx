import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-amber-500 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Готовы найти недвижимость вашей мечты?</h2>
        <p className="text-xl text-white mb-8">
          Свяжитесь с нами сегодня и начните свой путь к идеальному дому в Турции!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary">
            Просмотреть каталог
          </Button>
          <Button size="lg" variant="outline" className="bg-white text-amber-500 hover:bg-amber-50">
            Связаться с нами
          </Button>
        </div>
      </div>
    </div>
  )
}

