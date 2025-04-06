"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/navigation";

export default function FrenchAboutPage() {
  const t = useTranslations();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-between">
        <Link 
          href="/" 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          {t("app.back_home")}
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-4">{t("app.about_title")}</h1>
          <p className="text-lg mb-4">{t("app.about_description")}</p>
          <p className="text-md">
            {t("app.language_support")}
          </p>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">{t("app.about_features")}</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t("app.feature_i18n")}</li>
            <li>{t("app.feature_detection")}</li>
            <li>{t("app.feature_preference")}</li>
            <li>{t("app.feature_url")}</li>
          </ul>
        </div>
      </main>

      <footer className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Auriga Racing
      </footer>
    </div>
  );
}
