import { CategoryExpense } from "@prisma/client";
import { getUserByAuth0Id } from "../user/user.service";

const prisma = require("../connection");


export const getCategoryExpenses = async (idAuth0: string): Promise<CategoryExpense[] | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: idAuth0})
  return prisma.categoryExpense.findMany({
    where: {
      creatorId: id,
    },
  });
};

export interface CreateCategorieExpenseProps {
  title: string;
}

export const createCategoryExpense = async ({ title }: CreateCategorieExpenseProps): Promise<CategoryExpense | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: 'auth0|64ddc45cda4837390064861d'})
  return prisma.categoryExpense
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

export const deleteCategoryExpense = async (idd: number): Promise<CategoryExpense | null> => {
  return prisma.categoryExpense
    .delete({
      where: {
        id: idd,
      },
    })
};

