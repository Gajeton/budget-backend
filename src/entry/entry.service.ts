
import { getUserByAuth0Id } from "../user/user.service";

import { TravelMonth, TravelWithDestination, Travel, EntryWithCategoryExpenseIncome, CreateEntryProps } from "../types/DtoTypes";
import { CreateTravelProps, GetProps } from "../types/Types";
import { CategoryIncome } from "@prisma/client";
import moment from "moment";

const prisma = require("../connection");

export const getExpensesByMonth = async ({ month: month, idAuth0: idAuth0 }: { month: number, idAuth0: string }): Promise<EntryWithCategoryExpenseIncome[]> => {
  const { id } = await getUserByAuth0Id({ idAuth0: idAuth0 })
  return prisma.entry.findMany({
    where: {
      creatorId: id,
      month: month
    },
    _count: {
      nbTotal: true,
      nb: true
    },
    include: {
      categoryExpense: true,
      categoryIncome: true
    }
  });
};


export const getExpensesByWeek = async ({ week: week, idAuth0: idAuth0 }: { week: number, idAuth0: string }): Promise<EntryWithCategoryExpenseIncome[]> => {
  const { id } = await getUserByAuth0Id({ idAuth0: idAuth0 })
  return prisma.entry.findMany({
    where: {
      creatorId: id,
      week: week
    },
    include: {
      categoryExpense: true
    }
  });
};


export const getExpensesByDay = async ({ day: day, idAuth0: idAuth0 }: { day: number, idAuth0: string }): Promise<EntryWithCategoryExpenseIncome[]> => {
  const { id } = await getUserByAuth0Id({ idAuth0: idAuth0 })
  return prisma.entry.findMany({
    where: {
      creatorId: id,
      day: day
    },
    include: {
      categoryExpense: true
    }
  });
};


export const createEntryExpense = async ({ idAuth0, categorieExpenseId, categorieIncomeId, title, date, amount, currencyId, travelId }: CreateEntryProps): Promise<void> => {
  const { id } = await getUserByAuth0Id({ idAuth0: idAuth0 })
  return prisma.entry.create({
    data: {
      creator: {
        connect: {
          id: id,
        },
      },
      travel: {
        connect: {
          id: travelId
        },
      },
      currency: {
        connect: {
          id: currencyId
        },
      },
      categorieExpenseId: categorieExpenseId,
      amount: amount
    }
  })
};

export const createEntryIncome = async ({ idAuth0, categorieExpenseId, categorieIncomeId, title, date, amount, currencyId, travelId }: CreateEntryProps): Promise<void> => {
  const { id } = await getUserByAuth0Id({ idAuth0: idAuth0 })
  return prisma.entry.create({
    data: {
      creator: {
        connect: {
          id: id,
        },
      },
      travel: {
        connect: {
          id: travelId
        },
      },
      currency: {
        connect: {
          id: currencyId
        },
      },
      categorieIncomeId: categorieIncomeId,
      amount: amount
    }
  })
};



