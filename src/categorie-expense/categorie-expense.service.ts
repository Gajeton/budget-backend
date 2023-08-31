import { CategorieExpense } from "@prisma/client";
import { getUserByAuth0Id } from "../user/user.service";

const prisma = require("../connection");


export const getCategorieExpenses = async (idAuth0: string): Promise<CategorieExpense[] | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: idAuth0})
  return prisma.categorieExpense.findMany({
    where: {
      creatorId: id,
    },
  });
};

export interface CreateCategorieExpenseProps {
  title: string;
}

export const createCategorieExpense = async ({ title }: CreateCategorieExpenseProps): Promise<CategorieExpense | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: 'auth0|64ddc45cda4837390064861d'})
  return prisma.categorieExpense
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

export const deleteCategorieExpense = async (idd: number): Promise<CategorieExpense | null> => {
  return prisma.categorieExpense
    .delete({
      where: {
        id: idd,
      },
    })
};

