import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/context/LanguageContext"; // Подключаем контекст языка
import "./globals.css";

export const metadata = {
  title: "SaaS Project",
  description: "Modern SaaS Dashboard Application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* LanguageProvider обязательно должен обволакивать children */}
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
