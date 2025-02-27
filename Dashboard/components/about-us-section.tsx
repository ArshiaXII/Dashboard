import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function AboutUsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t("aboutUs")}</h2>
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto">{t("aboutUsDescription")}</p>
        <div className="text-center">
          <Button asChild>
            <Link href="/about">{t("learnMore")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

