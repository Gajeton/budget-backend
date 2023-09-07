
import { EntryWithCategoryExpenseIncome } from "../types/Types";
import { getUserByAuth0Id } from "../user/user.service";

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
      categoryExpense: {
        connect: {
          id: categorieExpenseId
        },
      },
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
      categoryIncome: {
        connect: {
          id: categorieIncomeId
        },
      },
      amount: amount
    }
  })
};

export const getEntryByCategoryExpenseAndTravelId = async ({ travelId, categoryExpenseId }: { travelId: number, categoryExpenseId: number }): Promise<any[]> => {
  return prisma.$transaction([
    prisma.$queryRaw`SELECT distinct ent.categoryExpenseId, ent.travelId, cat.title as categoryTitle, IFNULL(sum(ent.amount),0) as entrysAmount FROM Entry ent inner join CategoryExpense cat where ent.categoryExpenseId = ${categoryExpenseId} and ent.travelId = ${travelId} LIMIT 1`,
    prisma.entry.count({
      where: {
        travelId: travelId,
        categoryExpenseId: categoryExpenseId
      },
    })
])
};

export const getEntryByCategoryIncomeAndTravelId = async ({ travelId, categoryIncomeId }: { travelId: number, categoryIncomeId: number }): Promise<any[]> => {
  return prisma.$transaction([
    prisma.$queryRaw`SELECT distinct ent.categoryIncomeId, ent.travelId, cat.title as categoryTitle, IFNULL(sum(ent.amount),0) as entrysAmount FROM Entry ent inner join CategoryIncome cat where ent.categoryIncomeId = ${categoryIncomeId} and ent.travelId = ${travelId} LIMIT 1`,
    prisma.entry.count({
      where: {
        travelId: travelId,
        categoryIncomeId: categoryIncomeId
      },
    })
  ])
};





