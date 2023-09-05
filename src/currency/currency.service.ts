
import { getUserByAuth0Id } from "../user/user.service";

import { TravelMonth, TravelWithDestination, Travel, EntryWithCategoryExpenseIncome } from "../types/DtoTypes";
import { CreateTravelProps, GetProps } from "../types/Types";
import { CategoryIncome, Currency } from "@prisma/client";
import moment from "moment";

const prisma = require("../connection");

export const getCurrencies = async (): Promise<Currency[]> => {
  return prisma.currency.findMany();
};

