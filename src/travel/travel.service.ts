
import { getUserByAuth0Id } from "../user/user.service";

import { TravelMonth, TravelWithDestination, Travel, BudgetDetailIncomeItemData, BudgetDetailExpenseItemData, BudgetDetailIncomeData, BudgetDetailExpenseData } from "../types/DtoTypes";
import { CreateTravelProps, GetProps } from "../types/Types";
import { CategoryIncome } from "@prisma/client";

const prisma = require("../connection");

export const getTravels = async (idAuth0: string): Promise<TravelWithDestination[]> => {
  const { id } = await getUserByAuth0Id({ idAuth0: idAuth0 })
  return prisma.travel.findMany({
    where: {
      creatorId: id,
    },
    include: {
      // Include posts
      destination: {
        include: {
          destination: true, // Include post categories
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
        }
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

export const getTravelById = async ({ travelId, creatorId }: GetProps): Promise<Travel> => {
  const { id } = await getUserByAuth0Id({ idAuth0: creatorId })
  return prisma.travel
    .findUnique({
      where: {
        id: travelId,
        creatorId: id
      },
    })
};




export const getNumberOfMonths = async ({ travelId, creatorId }: GetProps): Promise<TravelMonth> => {
  const { id } = await getUserByAuth0Id({ idAuth0: creatorId })
  return prisma.travel
    .findUnique({
      where: {
        id: travelId,
        creatorId: id
      },
    })
};


export const getNumberOfWeeks = async ({ travelId, creatorId }: GetProps): Promise<TravelMonth> => {
  const { id } = await getUserByAuth0Id({ idAuth0: creatorId })
  return prisma.travel
    .findUnique({
      where: {
        id: travelId,
        creatorId: id
      },
    })
};


export const getNumberOfDays = async ({ travelId, creatorId }: GetProps): Promise<TravelMonth> => {
  const { id } = await getUserByAuth0Id({ idAuth0: creatorId })
  return prisma.travel
    .findUnique({
      where: {
        id: travelId,
        creatorId: id
      },
    })
};


export const getCategoryExpenseByTravelId = async ({travelId} : {travelId : number}): Promise<BudgetDetailExpenseData | null> => {
  return prisma.travel.findFirst({
    where: {
      id: travelId,
    },
    include: {
      // Include posts
      travelCategoryExpense : {
        include: {
          categoryExpense: true, // Include post categories
        },
      },
    }
  });
};

export const getCategoryIncomeByTravelId = async ({travelId} : {travelId : number}): Promise<BudgetDetailIncomeData | null> => {
  return prisma.travel.findMany({
    where: {
      id: travelId,
    },
    include: {
      // Include posts
      travelCategoryIncome : {
        include: {
          categoryIncome: true, // Include post categories
        },
      },
    }
  });
};




