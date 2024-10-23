import { Prisma, PrismaClient } from '@prisma/client';

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Pesto',
    email: 'penguination@gmail.com',
  },
  {
    name: 'Moodeng',
    email: 'moodeng@gmail.com',
  },
];

export const createDummy = async (prisma: PrismaClient) => {
  return Promise.all(
    userData.map(async (data) => {
      await prisma.user.upsert({
        where: { email: data.email },
        update: {},
        create: data,
      });
    }),
  );
};
