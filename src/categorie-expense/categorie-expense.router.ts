import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategorieExpenseService from "./categorie-expense.service";

export const CategorieExpenseRouter = express.Router();

// GET: List of expenses categorie
CategorieExpenseRouter.get("/getCategorieExpenses/:idAuth0", async (request: Request, response: Response) => {
    try {
    const categorieExpenses = await CategorieExpenseService.getCategoryExpenses(request.params.idAuth0);
    return response.status(200).json(categorieExpenses);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

CategorieExpenseRouter.post("/createCategorieExpense", async (request: Request, response: Response) => {
  const { title } = request.body;
  try {
  const categorieExpenses = await CategorieExpenseService.createCategoryExpense({title : title});
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});

CategorieExpenseRouter.delete("/deleteCategorieExpense/:idd", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.idd, 10);
  try {
  const categorieExpenses = await CategorieExpenseService.deleteCategoryExpense(id);
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});
