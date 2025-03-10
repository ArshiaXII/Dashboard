"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">TurqaEstate</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner in finding the perfect property in Turkey.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("frequentlyVisitedPages")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-white">
                  {t("catalog")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-400 hover:text-white">
                  {t("contacts")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("corporate")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal-notice" className="text-gray-400 hover:text-white">
                  {t("legalNotice")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-gray-400 hover:text-white">
                  {t("termsOfUse")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-400 hover:text-white">
                  {t("cookiePolicy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("contact")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                <strong>{t("callUs")}:</strong> +90 123 456 7890
              </li>
              <li className="text-gray-400">
                <strong>Email:</strong> info@turqaestate.com
              </li>
              <li className="text-gray-400">
                <strong>{t("address")}:</strong> Alanya, Antalya, Turkey
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} TurqaEstate. {t("footerRights")}</p>
        </div>
      </div>
    </footer>
  )
} 