"use server";

import { prisma as db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createTask(formData) {
  // Защита: если сборщик Vercel вызывает функцию "всухую" без базы данных
  if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.DATABASE_URL) {
    return null;
  }

  // Реальная логика для работающего сайта
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title");
  const boardId = formData.get("boardId");

  await db.task.create({
    data: {
      title,
      boardId,
      status: "TODO",
    },
  });

  revalidatePath(`/boards/${boardId}`);
}
