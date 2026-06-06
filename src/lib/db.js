import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// Проверяем, есть ли URL базы данных. Если нет (например, при сборке) — передаем пустую строку, чтобы предотвратить крэш конструктора.
const databaseUrl = process.env.DATABASE_URL || "";

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
