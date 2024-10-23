import { PrismaClient } from '@prisma/client';
import { createDummy } from './seeds/dummy';

const prisma = new PrismaClient();

const transfer = async () => {
  await prisma.$connect();

  await createDummy(prisma);

  await prisma.$disconnect();
};

const main = async () => {
  console.log(`Start seeding ...`);

  await transfer();

  console.log(`Seeding finished.`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
