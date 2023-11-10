import type { Request, Response } from "express";
import express from "express";

import * as CategoryIncomeService from "./categorie-income.service";

export const CategoryIncomeRouter = express.Router();

CategoryIncomeRouter.post("/create_category_income", async (request: Request, response: Response) => {
  const { title } = request.body;
  try {
    const categorieExpenses = await CategoryIncomeService.createCategoryIncome({ title: title });
    return response.status(200).json(categorieExpenses);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

CategoryIncomeRouter.delete("/delete_category_income/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const categorieExpenses = await CategoryIncomeService.deleteCategoryIncome(id);
    return response.status(200).json(categorieExpenses);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});


