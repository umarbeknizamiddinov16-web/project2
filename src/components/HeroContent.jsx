"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext"; // Импортируем наш язык

export default function HeroContent({ userId }) {
  // Достаем текущий язык (lang), функцию переключения (changeLanguage) и словарь (t)
  const { lang, changeLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white flex flex-col items-center justify-center px-4 relative">
      
      {/* Кнопки переключения RU / EN в верхнем правом углу */}
      <div className="absolute top-6 right-6 flex bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20">
        <button
          onClick={() => changeLanguage("ru")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition ${lang === "ru" ? "bg-white text-indigo-950 shadow-sm" : "text-white/60 hover:text-white"}`}
        >
          RU
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition ${lang === "en" ? "bg-white text-indigo-950 shadow-sm" : "text-white/60 hover:text-white"}`}
        >
          EN
        </button>
      </div>

      <div className="text-center max-w-2xl">
        {/* Заголовок теперь берется из словаря */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
          {t.hero.title}
        </h1>
        
        {/* Подзаголовок тоже берется из словаря */}
        <p className="text-lg text-gray-400 mb-10">
          {t.hero.subtitle}
        </p>

        <div className="flex gap-4 justify-center">
          {userId ? (
            // Кнопка для вошедшего пользователя
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition shadow-lg shadow-blue-500/20 text-lg"
            >
              {t.hero.dashboardBtn}
            </Link>
          ) : (
            // Кнопки для гостей
            <>
              <Link
                href="/sign-in"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition text-md"
              >
                {t.hero.loginBtn}
              </Link>
              <Link
                href="/sign-up"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-medium px-6 py-3 rounded-xl transition text-md"
              >
                {t.hero.registerBtn}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
