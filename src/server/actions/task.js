"use server";

import { prisma as db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Функция создания новой задачи
export async function createTask(formData) {
  // 1. Проверяем, вошел ли пользователь в систему через Clerk
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Вы не авторизованы");
  }

  // 2. Достаем данные, которые пользователь ввел в форму на сайте
  const title = formData.get("title");
  const boardId = formData.get("boardId");

  if (!title || !boardId) {
    throw new Error("Название задачи не может быть пустым");
  }

  // 3. Сохраняем задачу в облачную базу данных
  await db.task.create({
    data: {
      title: title,
      status: "TODO", // Все новые задачи по умолчанию падают в колонку "Надо сделать"
      boardId: boardId,
    },
  });

  // 4. Заставляем Next.js моментально перерисовать страницу доски, чтобы юзер увидел свою задачу
  revalidatePath(`/dashboard/boards/${boardId}`);
}
