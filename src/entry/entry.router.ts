import type { Request, Response } from "express";
import express from "express";


const prisma = require("../connection");

import * as EntryService from "./entry.service";
import { CreateEntryProps } from "../types/PropsType";

export const EntryRouter = express.Router();

EntryRouter.post("/entries_month", async (request: Request, response: Response) => {
    const { week, idAuth0 }: { week: number, idAuth0: string } = request.body;
    try {
        const entry = await EntryService.getExpensesByMonth({ type: week, idAuth0: idAuth0 });
        return response.status(200).json();
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.post("/entries_week", async (request: Request, response: Response) => {
    const { week, idAuth0 }: { week: number, idAuth0: string } = request.body;
    try {
        const entry = await EntryService.getExpensesByWeek({ type: week, idAuth0: idAuth0 });
        return response.status(200).json(entry);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.get("/entries_day", async (request: Request, response: Response) => {
    const { day, idAuth0 }: { day: number, idAuth0: string } = request.body;
    try {
        const entry = await EntryService.getExpensesByDay({ type: day, idAuth0: idAuth0 });
        return response.status(200).json(entry);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.post("/create_entry", async (request: Request, response: Response) => {
    const { idAuth0, categorieExpenseId, categorieIncomeId, title, date, amount, travelId, currencyId }: CreateEntryProps = request.body
    let entry = null
    try {
        if (amount >= 0) {
            entry = await EntryService.createEntryExpense({ idAuth0, categorieExpenseId, categorieIncomeId, title, date, amount, currencyId, travelId })
        } else {
            entry = await EntryService.createEntryIncome({ idAuth0, categorieExpenseId, categorieIncomeId, title, date, amount, currencyId, travelId })
        }
        return response.status(200).json(entry);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.get("/entry_category_expenses/:categoryId/:travelId", async (request: Request, response: Response) => {
    const  travelId : number = parseInt(request.params.travelId);
    const  categoryId : number = parseInt(request.params.categoryId);
    try {
        const [entrys, total]  = await EntryService.getEntryByCategoryExpenseAndTravelId({ travelId: travelId, categoryExpenseId: categoryId });
        
        return response.status(200).json({data : {...entrys[0]}, total : total});
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.get("/entry_category_income/:categoryId/:travelId", async (request: Request, response: Response) => {
    const  travelId : number = parseInt(request.params.travelId);
    const  categoryId : number = parseInt(request.params.categoryId);
    try {
        const [entrys, total] = await EntryService.getEntryByCategoryIncomeAndTravelId({ travelId: travelId, categoryIncomeId: categoryId });
        return response.status(200).json({data : {...entrys[0]}, total : total});
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});




