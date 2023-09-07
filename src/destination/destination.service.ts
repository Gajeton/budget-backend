import { Destination } from "@prisma/client";
import { getUserByAuth0Id } from "../user/user.service";

const prisma = require("../connection");

export const getDestinations = async (idAuth0: string): Promise<Destination[] | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: idAuth0})
  return prisma.destination.findMany({
    where: {
      creatorId: id,
    },
  });
};

export const createDestination = async ({ title }: {title : string}): Promise<Destination | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: 'auth0|64ddc45cda4837390064861d'})
  return prisma.destination
    .create({
      data: {
        title,
        creator: {
          connect: {
            id: id
          }
        }

      },
    })
};

export const deleteDestination = async (idd: number): Promise<Destination | null> => {
  return prisma.destination
    .delete({
      where: {
        id: idd,
      },
    })
};

