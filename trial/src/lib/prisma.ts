import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// During build time on some environments, DATABASE_URL might be missing.
// We avoid initializing Prisma if it's not needed at build time.
let prisma: ReturnType<typeof prismaClientSingleton>;

if (typeof window === "undefined" && !process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
  // Mock or just don't initialize - this will be caught at runtime if used.
  prisma = {} as any;
} else {
  prisma = globalThis.prisma ?? prismaClientSingleton()
  if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
}

export default prisma
