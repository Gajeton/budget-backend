import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserRouterService from "./user.service";
import * as CategoryExpenseService from "../categorie-expense/categorie-expense.service";
import * as CategoryIncomeService from "../categorie-income/categorie-income.service";
import * as DestinationService from "../destination/destination.service";
export const UserRouter = express.Router();


UserRouter.post("/create_user", async (request: Request, response: Response) => {
  const { idAuth0, name } = request.body
  try {
    const user = await UserRouterService.createUser({ idAuth0, name });
    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

UserRouter.get("/categories_income", async (request: Request, response: Response) => {
  try {
    const user = await CategoryIncomeService.getCategoryIncomes(request.params.idAuth0);
    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
UserRouter.get("/categories_expense", async (request: Request, response: Response) => {
  try {
    const user = await CategoryExpenseService.getCategoryExpenses(request.params.idAuth0);
    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

UserRouter.get("/destinations", async (request: Request, response: Response) => {
  try {
    const destinations = await DestinationService.getDestinations(request.params.idAuth0);
    return response.status(200).json(destinations);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

