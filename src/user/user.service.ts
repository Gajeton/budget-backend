import { User } from "@prisma/client";

const prisma = require("../connection");

interface UserProps {
  idAuth0: string,
  name?: string
}

export const createUser = async ({ idAuth0, name }: UserProps): Promise<User | null> => {
  return prisma.user
    .upsert({
      where: {
        idAuth0: idAuth0,
      },
      update: {
        name: name,
        idAuth0: idAuth0,
      },
      create: {
        name: name,
        idAuth0: idAuth0,
      },
    })
};

export const getUserByAuth0Id = async ({ idAuth0 }: UserProps): Promise<User> => {
  return prisma.user
    .findFirst({
      where: {
        idAuth0: idAuth0,
      },
    })
};

