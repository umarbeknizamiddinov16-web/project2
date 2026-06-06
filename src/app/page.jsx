import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
  // Проверяем, вошел ли уже пользователь
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
          Управляйте задачами нового поколения
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          Современный SaaS-трекер задач для продуктивных команд. Создавайте Канбан-доски, организуйте проекты и следите за прогрессом в реальном времени.
        </p>

        <div className="flex gap-4 justify-center">
          {userId ? (
            // Если вошел — ведем сразу в личный кабинет
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition shadow-lg shadow-blue-500/20 text-lg"
            >
              Перейти в панель управления →
            </Link>
          ) : (
            // Если не вошел — показываем кнопки входа и регистрации
            <>
              <Link
                href="/sign-in"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition text-md"
              >
                Войти в аккаунт
              </Link>
              <Link
                href="/sign-up"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-medium px-6 py-3 rounded-xl transition text-md"
              >
                Зарегистрироваться
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
