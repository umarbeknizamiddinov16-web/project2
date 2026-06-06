import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

let prismaInstance;

// Если Vercel пытается запустить код во время генерации статических страниц (сборки)
if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.DATABASE_URL) {
  // Возвращаем пустой прокси-объект, чтобы методы вроде db.board.findUnique() не вызывали ошибку конструктора
  prismaInstance = new Proxy({}, {
    get: () => () => Promise.resolve(null)
  });
} else {
  // В продакшене запускаем реальную Prisma
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
}

export const prisma = prismaInstance;
