import {  CategoryIncome, Travel } from "@prisma/client";
import { getUserByAuth0Id } from "../user/user.service";
import { Currency, currencyInfo } from "../types/enums/currency.enum";
import { Moment } from "moment";
import { TravelDestinationWithObject, TravelWithDestination } from "../types/Travel";

const prisma = require("../connection");



export const getTravels = async (idAuth0: string): Promise<TravelWithDestination[]> => {
  const {id} = await getUserByAuth0Id({idAuth0: idAuth0})
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
  }});
};

export interface CreateTravelProps {
    destinationId: number;
    idAuth0: string
    currencyId: string
    startDate : Moment
    endDate: Moment
    month : number
    week : number
    day : number
  }

export const createTravel = async ({ ...data }: CreateTravelProps): Promise<Travel | null> => {
  const {id} = await getUserByAuth0Id({idAuth0: data.idAuth0})
  const currencyId = parseInt(data.currencyId)
  return prisma.travel
    .create({
      data: {
        currency: currencyId,
        startDate: data.startDate,
        endDate: data.endDate,
        month: data.month,
        week: data.week,
        day: data.day,
        creator : {
            connect : {
                id : id
            }
        },
        destination: {
          create: {
            destinationId : data.destinationId
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

