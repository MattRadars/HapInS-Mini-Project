const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      id: '1',
      email: 'mattkienth@gmail.com',
      name: 'matthew',
    },
  });

  console.log(newUser);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
