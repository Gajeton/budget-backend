import {  CategoryIncome } from "@prisma/client";
import { getUserByAuth0Id } from "../user/user.service";

const prisma = require("../connection");

export const getCategoryIncomes = async (idAuth0: string): Promise<CategoryIncome[] | null> => {
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

export const createCategoryIncome = async ({ title }: CreateCategorieExpenseProps): Promise<CategoryIncome | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: 'auth0|64ddc45cda4837390064861d'})
  return prisma.categoryIncome
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

export const deleteCategoryIncome = async (idd: number): Promise<CategoryIncome | null> => {
  return prisma.categoryIncome
    .delete({
      where: {
        id: idd,
      },
    })
};

