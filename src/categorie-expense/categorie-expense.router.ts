import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategoryExpenseService from "./categorie-expense.service";

export const CategoryExpenseRouter = express.Router();

// GET: List of expenses categorie
CategoryExpenseRouter.get("/getCategoryExpenses/:idAuth0", async (request: Request, response: Response) => {
    try {
    const categorieExpenses = await CategoryExpenseService.getCategoryExpenses(request.params.idAuth0);
    return response.status(200).json(categorieExpenses);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

CategoryExpenseRouter.post("/createCategoryExpense", async (request: Request, response: Response) => {
  const { title } = request.body;
  try {
  const categorieExpenses = await CategoryExpenseService.createCategoryExpense({title : title});
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});

CategoryExpenseRouter.delete("/deleteCategoryExpense/:idd", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.idd, 10);
  try {
  const categorieExpenses = await CategoryExpenseService.deleteCategoryExpense(id);
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});
