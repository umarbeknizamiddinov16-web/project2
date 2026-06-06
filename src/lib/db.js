import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

let prismaInstance;

// Самая надёжная проверка: если сборщик Vercel компилирует проект, 
// мы отдаём ему пустой объект, полностью блокируя создание PrismaClient
if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'test') {
  prismaInstance = {}; 
} else {
  // Реальная база данных включится только когда сайт запустится в браузере
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
}

export const prisma = prismaInstance;
