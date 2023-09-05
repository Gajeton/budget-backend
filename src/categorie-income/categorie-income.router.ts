import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategoryIncomeService from "./categorie-income.service";

export const CategoryIncomeRouter = express.Router();

// GET: List of all Authors
CategoryIncomeRouter.get("/getCategoryIncomes/:idAuth0", async (request: Request, response: Response) => {
  try {
  const categorieExpenses = await CategoryIncomeService.getCategoryIncomes(request.params.idAuth0);
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});

CategoryIncomeRouter.post("/createCategoryIncome", async (request: Request, response: Response) => {
const { title } = request.body;
try {
const categorieExpenses = await CategoryIncomeService.createCategoryIncome({title : title});
return response.status(200).json(categorieExpenses);
} catch (error: any) {
return response.status(500).json(error.message);
}
});

CategoryIncomeRouter.delete("/deleteCategoryIncome/:id", async (request: Request, response: Response) => {
const id: number = parseInt(request.params.id, 10);
try {
const categorieExpenses = await CategoryIncomeService.deleteCategoryIncome(id);
return response.status(200).json(categorieExpenses);
} catch (error: any) {
return response.status(500).json(error.message);
}
});

CategoryIncomeRouter.get("/getCategoryIncomeByTravelId/:travelId", async (request: Request, response: Response) => {
  try {
  const categorieExpenses = await CategoryIncomeService.getCategoryExpenseByTravelId({travelId : parseInt(request.params.travelId)});
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});


