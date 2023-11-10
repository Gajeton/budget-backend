import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategoryExpenseService from "./categorie-expense.service";

export const CategoryExpenseRouter = express.Router();


CategoryExpenseRouter.post("/create_category_expense", async (request: Request, response: Response) => {
  const { title } = request.body;
  try {
  const categorieExpenses = await CategoryExpenseService.createCategoryExpense({title : title});
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});

CategoryExpenseRouter.delete("/delete_category_expense/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
  const categorieExpenses = await CategoryExpenseService.deleteCategoryExpense(id);
  return response.status(200).json(categorieExpenses);
} catch (error: any) {
  return response.status(500).json(error.message);
}
});

