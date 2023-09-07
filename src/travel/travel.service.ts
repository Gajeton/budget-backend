
import { getUserByAuth0Id } from "../user/user.service";

import { CategoryIncome, Travel } from "@prisma/client";

import { CategoryExpenseByTravelIdType, CategoryIncomeByTravelIdType, CreateTravelProps, GetProps, GetTravelByIdType, GetTravelDetailByIdType, GetTravelsType, TravelMonthType, TravelWeekType } from "../types/Types";

const prisma = require("../connection");

export const getTravels = async (idAuth0: string): Promise<GetTravelsType[]> => {
  return prisma.$transaction[(
    prisma.$queryRaw`SELECT  tra.id, tra.startDate, tra.endDate, IFNULL(count(ci.id),0) as totalIncome , IFNULL(count(ce.id),0) as totalExpense, (select title FROM Destination d inner join TravelDestination td on td.destinationId = d.id  inner join Travel tra1 on td.travelId = tra1.id LIMIT 1) as destination  FROM Travel tra LEFT join Entry ent ON ent.travelId = tra.id left join CategoryExpense ce on ent.categoryExpenseId = ce.id left join CategoryIncome ci on ent.categoryIncomeId = ci.id  GROUP BY tra.id LIMIT 10 offset 10`
  )] 
};

export const createTravelCategoryExpense = async (categoryExpenseId: number , travelId : number): Promise<Travel> => {
  return prisma.travelCategoryExpense.create({
    data : {
      travel: {
        connect: {
          id: travelId,
        },
      },
      categoryExpense: {
        connect: {
          id: categoryExpenseId,
        },
      },
    }
  });
};

export const createTravelCategoryIncome = async (categoryIncomeId: number , travelId : number): Promise<Travel> => {
  return prisma.travelCategoryIncome.create({
    data : {
      travel: {
        connect: {
          id: travelId,
        },
      },
      categoryIncome: {
        connect: {
          id: categoryIncomeId,
        },
      },
    }
  });
};

export const createTravel = async ({ ...data }: CreateTravelProps): Promise<Travel | null> => {
  const { id } = await getUserByAuth0Id({ idAuth0: data.idAuth0 })
  const currencyId = parseInt(data.currencyId)
  return prisma.travel
    .create({
      data: {
        startDate: data.startDate,
        endDate: data.endDate,
        month: data.month,
        week: data.week,
        day: data.day,
        budget: data.budget,
        currency : {
          connect : {
            id : currencyId
          }
        },
        creator: {
          connect: {
            id: id
          }
        },
        destination: {
          create: {
            destinationId: data.destinationId
          }
        },
      },
    })
};

export const deleteTravel = async (idd: number): Promise<CategoryIncome | null> => {
  return prisma.travel
    .delete({
      where: {
        id: idd,
      },
    })
};

export const getTravelById = async (travelId: number): Promise<GetTravelByIdType> => {
  return prisma.$queryRaw`SELECT tra.id, tra.startDate, tra.endDate, IFNULL(sum(ent.amount),0) as totalBudget, tra.budget, tra.day FROM Travel tra LEFT join Entry ent ON ent.travelId = tra.id where tra.id = ${travelId}`
};

export const getTravelDetailById = async (travelId: number): Promise<GetTravelDetailByIdType> => {
  return  prisma.$queryRaw`SELECT tra.id, tra.startDate, tra.endDate, IFNULL(count(ci.id),0) as nbIncome , IFNULL(count(ce.id),0) as nbExpense,(select IFNULL(sum(ent2.amount),0) FROM Entry ent2 inner join CategoryIncome ci2 on ci2.id = ent2.categoryIncomeId where ent2.travelId = 16) as totalIncome, (select IFNULL(sum(ent2.amount),0) FROM Entry ent2 inner join CategoryExpense ce2 on ce2.id = ent2.categoryExpenseId where ent2.travelId = tra.id ) as totalExpense FROM Travel tra LEFT join Entry ent ON ent.travelId = tra.id left join CategoryExpense ce on ent.categoryExpenseId = ce.id left join CategoryIncome ci on ent.categoryIncomeId = ci.id where tra.id = ${travelId}`
};

export const getNumberOfWeeks = async ({ travelId, creatorId }: GetProps): Promise<TravelMonthType> => {
  const { id } = await getUserByAuth0Id({ idAuth0: creatorId })
  return prisma.travel
    .findUnique({
      where: {
        id: travelId,
        creatorId: id
      },
    })
};

export const getNumberOfDays = async ({ travelId, creatorId }: GetProps): Promise<TravelWeekType> => {
  const { id } = await getUserByAuth0Id({ idAuth0: creatorId })
  return prisma.travel
    .findUnique({
      where: {
        id: travelId,
        creatorId: id
      },
    })
};

export const getCategoryExpenseByTravelId = async ({travelId} : {travelId : number}): Promise<CategoryExpenseByTravelIdType[]> => {
  return prisma.$queryRaw`SELECT ent.categoryExpenseId,ent.id, ent.travelId, cat.title as categoryTitle, (select IFNULL(sum(ent2.amount),0) from Entry ent2 inner join CategoryExpense cat2 on ent2.categoryExpenseId = cat2.id where cat2.id = cat.id and ent2.travelId = ${travelId} GROUP BY cat2.id) as entrysAmount, (select IFNULL(count(ent2.id),0) from Entry ent2 inner join CategoryExpense cat2 on ent2.categoryExpenseId = cat2.id where cat2.id = cat.id and ent2.travelId = ${travelId} GROUP BY cat2.id) as countEntry FROM Entry ent inner join CategoryExpense cat where ent.travelId = ${travelId} GROUP BY cat.id`
};

export const getCategoryIncomeByTravelId = async ({travelId} : {travelId : number}): Promise<CategoryIncomeByTravelIdType[]> => {
  return prisma.$queryRaw`SELECT ent.categoryIncomeId,ent.id, ent.travelId, cat.title as categoryTitle, (select IFNULL(sum(ent2.amount),0) from Entry ent2 inner join CategoryIncome cat2 on ent2.categoryIncomeId = cat2.id where cat2.id = cat.id and ent2.travelId = ${travelId} GROUP BY cat2.id) as entrysAmount FROM Entry ent inner join CategoryIncome cat where ent.travelId = ${travelId} GROUP BY cat.id`
};