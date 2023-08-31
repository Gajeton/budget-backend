import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategorieIncomeService from "./categorie-income.service";

export const CategorieIncomeRouter = express.Router();

// GET: List of all Authors
CategorieIncomeRouter.get("/getCategorieExpenses/:idAuth0", async (request: Request, response: Response) => {
  try {
  const categorieExpenses = await CategorieIncomeService.getCategorieExpenses(request.params.idAuth0);
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});

CategorieIncomeRouter.post("/createCategorieExpense", async (request: Request, response: Response) => {
const { title } = request.body;
try {
const categorieExpenses = await CategorieIncomeService.createCategorieExpense({title : title});
return response.status(200).json(categorieExpenses);
} catch (error: any) {
return response.status(500).json(error.message);
}
});

CategorieIncomeRouter.delete("/deleteCategorieExpense/:idd", async (request: Request, response: Response) => {
const id: number = parseInt(request.params.idd, 10);
try {
const categorieExpenses = await CategorieIncomeService.deleteCategorieExpense(id);
return response.status(200).json(categorieExpenses);
} catch (error: any) {
return response.status(500).json(error.message);
}
});
