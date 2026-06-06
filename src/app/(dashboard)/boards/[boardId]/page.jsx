export const dynamic = 'force-dynamic'; // Оставляем ОДНУ строчку в самом верху

import { prisma as db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { createTask } from "@/server/actions/task";

export default async function BoardIdPage({ params }) {
  const { userId } = await auth();
  const { boardId } = await params;

  // 1. Загружаем доску и проверяем, принадлежит ли она этому пользователю
  const board = await db.board.findUnique({
    where: { id: boardId },
    include: { tasks: true }, 
  });

  if (!board || board.userId !== userId) {
    return notFound(); 
  }

  // 2. Группируем задачи по колонкам/статусам
  const columns = {
    TODO: board.tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: board.tasks.filter((t) => t.status === "IN_PROGRESS"),
    DONE: board.tasks.filter((t) => t.status === "DONE"),
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Доска: {board.title}</h1>

      {/* Быстрая форма добавления новой задачи */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-8 max-w-md">
        <h3 className="font-semibold text-gray-700 mb-2 text-sm">Быстро добавить задачу</h3>
        <form action={createTask} className="flex gap-2">
          <input type="hidden" name="boardId" value={boardId} />
          <input
            type="text"
            name="title"
            placeholder="Что нужно сделать?"
            required
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            +
          </button>
        </form>
      </div>

      {/* Сетка из трех колонок (Канбан-доска) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="bg-gray-50 p-4 rounded-xl border border-gray-200 min-h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-700 text-sm tracking-wide">
                {status === "TODO" && "📋 НАДО СДЕЛАТЬ"}
                {status === "IN_PROGRESS" && "⚡ В ПРОЦЕССЕ"}
                {status === "DONE" && "✅ ГОТОВО"}
              </h2>
              <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {tasks.length}
              </span>
            </div>

            {/* Список карточек внутри колонки */}
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
                  Перетащите сюда или создайте задачу
                </p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(task.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Этот код говорит Next.js: "Во время сборки тут пусто, не пытайся генерировать эту страницу заранее!"
export function generateStaticParams() {
  return [];
}
// Снизу дубликат строки удалён!
