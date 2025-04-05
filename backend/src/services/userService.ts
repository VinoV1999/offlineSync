import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserService = async (email: string, firstName: string, lastName: string, age: number) => {
  return await prisma.userDetails.create({
    data: {
      email,
      firstName,
      lastName,
      age,
    },
  });
};

export const getUsersService = async () => {
  return await prisma.userDetails.findMany();
};
