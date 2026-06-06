"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/languages";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ru");

  // Подгружаем сохраненный язык при первом старте сайта
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  // Получаем нужные переводы из нашего словаря
  const t = translations[lang] || translations["ru"];

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
