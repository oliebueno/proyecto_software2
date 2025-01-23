import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creación del usuario
  const newUser  = await prisma.USER.create({
    data: {
      name: 'Jose Alfonzo',
      email: 'jose@gmail.com',
    },
  });
  console.log('Usuario creado:', newUser );

  // Consulta de todos los usuarios
  const users = await prisma.user.findMany();
  console.log('Usuarios:', users);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });