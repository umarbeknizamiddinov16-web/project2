import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/context/LanguageContext"; // 1. Добавили импорт нашего языка
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "SaaS Dashboard",
  description: "Dashboard Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey="pk_test_dmVyaWZpZWQtY2FsZi0xLmNsZXJrLmFjY291bnRzLmRldiQ">
      <html lang="ru">
        <body className={inter.className}>
          {/* 2. Оборачиваем детей в LanguageProvider прямо внутри тега body */}
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
