"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Функция для создания новой доски (например, "Проект Альфа")
export async function createBoard(formData) {
  // 1. Получаем ID авторизованного пользователя из Clerk
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Вы должны быть авторизованы");
  }

  // 2. Достаем название доски из отправленной формы
  const title = formData.get("title");

  if (!title || typeof title !== "string") {
    throw new Error("Неверное название доски");
  }

  // 3. Сохраняем доску в базу данных PostgreSQL
  await db.board.create({
    data: {
      title: title,
      userId: userId, // Привязываем доску к конкретному юзеру
    },
  });

  // 4. Говорим Next.js обновить кэш страницы, чтобы новая доска сразу появилась на экране
  revalidatePath("/dashboard");
}
