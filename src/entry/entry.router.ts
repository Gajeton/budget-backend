import type { Request, Response } from "express";
import express from "express";

import { Prisma } from "@prisma/client";
import moment from "moment";
import { BudgetDetailExpenseItemData, CreateEntryProps, EntriesWithCategoryExpenseIncome, EntryWithCategoryExpenseIncome, GetTravels, Travel, TravelWithDestination } from "../types/DtoTypes";
const prisma = require("../connection");

import * as EntryService from "./entry.service";
export const EntryRouter = express.Router();

EntryRouter.post("/getExpensesByMonth", async (request: Request, response: Response) => {
    const { week, idAuth0 }: { week: number, idAuth0: string } = request.body;
    try {
        const entry = await EntryService.getExpensesByMonth({ month: week, idAuth0: idAuth0 });
        // if (entry) {
        //     const entrysFormated: EntriesWithCategoryExpenseIncome[] = []
        //     entry.map(res => {
        //         const entrysFormated: EntriesWithCategoryExpenseIncome = {
        //             data: null,
        //             nbTotal: 0,
        //             nbExpense: 0,
        //             nbIncome: 0,
        //             total: 0,
        //             totalExpense: 0,
        //             totalIncome: 0,
        //             balanceIncome: 0
        //         }
        //         entrysFormated.data = entry
        //         entrysFormated.nbTotal = res.categoryExpense
        //         entrysFormated.nbExpense = data.count()
        //         res.destination.map(x => {
        //             if (x.destination) {
        //                 console.log(x.destination)
        //                 travelsFormatedItem.destination.push(x.destination.title)
        //             }

        //         })
        //         travelsFormated.push(travelsFormatedItem)
        //     })

        // }
        return response.status(200).json();
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.post("/getExpensesByWeek", async (request: Request, response: Response) => {
    const { week, idAuth0 }: { week: number, idAuth0: string } = request.body;
    try {
        const entry = await EntryService.getExpensesByWeek({ week: week, idAuth0: idAuth0 });
        return response.status(200).json(entry);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.get("/getExpensesByDay", async (request: Request, response: Response) => {
    const { day, idAuth0 }: { day: number, idAuth0: string } = request.body;
    try {
        const entry = await EntryService.getExpensesByDay({ day: day, idAuth0: idAuth0 });
        return response.status(200).json(entry);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.post("/createEntry", async (request: Request, response: Response) => {
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


EntryRouter.get("/getEntryByCategoryExpenseAndTravelId/:categoryId/:travelId", async (request: Request, response: Response) => {
    const  travelId : number = parseInt(request.params.travelId);
    const  categoryId : number = parseInt(request.params.categoryId);
    try {
        const [entrys, total]  = await EntryService.getEntryByCategoryExpenseAndTravelId({ travelId: travelId, categoryExpenseId: categoryId });
        
        return response.status(200).json({data : {...entrys[0]}, total : total});
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

EntryRouter.get("/getEntryByCategoryIncomeAndTravelId/:categoryId/:travelId", async (request: Request, response: Response) => {
    const  travelId : number = parseInt(request.params.travelId);
    const  categoryId : number = parseInt(request.params.categoryId);
    try {
        const [entrys, total] = await EntryService.getEntryByCategoryIncomeAndTravelId({ travelId: travelId, categoryIncomeId: categoryId });
        return response.status(200).json({data : {...entrys[0]}, total : total});
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});




