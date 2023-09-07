

import { Currency } from "@prisma/client";

const prisma = require("../connection");

export const getCurrencies = async (): Promise<Currency[]> => {
  return prisma.currency.findMany();
};

