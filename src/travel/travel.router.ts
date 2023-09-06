import type { Request, Response } from "express";
import express from "express";

import { CategoryExpense, CategoryIncome, Prisma } from "@prisma/client";
import moment from "moment";
import { GetTravels, Travel, TravelCategoryExpenseDto, TravelCategoryIncomeDto, TravelWithDestination } from "../types/DtoTypes";
import * as TravelService from "./travel.service";
import { param } from "express-validator";


export const TravelRouter = express.Router();




// GET: List of all Authors
TravelRouter.get("/getTravelById/:travelId/:creatorId", async (request: Request, response: Response) => {
    const travelId = parseInt(request.params.travelId)
    try {
        const travels: Travel = await TravelService.getTravelById({ creatorId: request.params.creatorId, travelId: travelId });
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getTravels/:idAuth0", async (request: Request, response: Response) => {
    try {
        const travels: TravelWithDestination[] = await TravelService.getTravels(request.params.idAuth0);
        if (travels) {
            const travelsFormated: GetTravels[] = []
            travels.map(res => {
                const travelsFormatedItem: GetTravels = {
                    id: 0,
                    destination: [],
                    startDate: moment(),
                    endDate: moment()
                }
                travelsFormatedItem.startDate = res.startDate
                travelsFormatedItem.endDate = res.endDate
                travelsFormatedItem.id = res.id
                res.destination.map(x => {
                    if (x.destination) {
                        travelsFormatedItem.destination.push(x.destination.title)
                    }

                })
                travelsFormated.push(travelsFormatedItem)
            })
            return response.status(200).json(travelsFormated);
        }

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.post("/createTravel", async (request: Request, response: Response) => {
    const { ...travel } = request.body;
    const test = { ...travel }
    try {
        const travels = await TravelService.createTravel(test);
        if(travels) {
            test.categoryExpenseId.map(async (x : number) => await TravelService.createTravelCategoryExpense(x, travels.id))
            test.categoryIncomeId.map(async (x : number) => await TravelService.createTravelCategoryIncome(x, travels.id))
        }
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.delete("/deleteDestination/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const travels = await TravelService.deleteTravel(id);
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getNumberOfMonths/:travelId/:creatorId", async (request: Request, response: Response) => {
    const travelId: number = parseInt(request.params.travelId, 10);
    try {
        const travels = await TravelService.getNumberOfMonths({ creatorId: request.params.creatorIdatorId, travelId: travelId });
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getNumberOfWeeks/:travelId/:creatorId", async (request: Request, response: Response) => {
    const travelId: number = parseInt(request.params.travelId, 10);
    try {
        const travels = await TravelService.getNumberOfMonths({ creatorId: request.params.creatorIdatorId, travelId: travelId });
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getNumberOfDays/:travelId/:creatorId", async (request: Request, response: Response) => {
    const travelId: number = parseInt(request.params.travelId, 10);
    try {
        const travels = await TravelService.getNumberOfDays({ creatorId: request.params.creatorIdatorId, travelId: travelId });
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getCategoryIncomeByTravelId/:travelId", async (request: Request, response: Response) => {
    try {
        const categorieIncomes = await TravelService.getCategoryIncomeByTravelId({ travelId: parseInt(request.params.travelId) });
        let categoryIncomeArray: CategoryIncome[] = []
        if (categorieIncomes && categorieIncomes.travelCategoryIncome) {
            categorieIncomes.travelCategoryIncome.map((res : TravelCategoryIncomeDto) => {
                categoryIncomeArray.push(res.categoryIncome)
            })
            return response.status(200).json(categoryIncomeArray);
        }
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});



TravelRouter.get("/getCategoryExpenseByTravelId/:travelId", async (request: Request, response: Response) => {
    try {
        const categoryExpenses = await TravelService.getCategoryExpenseByTravelId({ travelId: parseInt(request.params.travelId) });
        let categoryExpenseArray:  CategoryIncome[] =  []
        if (categoryExpenses && categoryExpenses.travelCategoryExpense) {
            categoryExpenses.travelCategoryExpense.map((res : TravelCategoryExpenseDto) => {
                categoryExpenseArray.push(res.categoryExpense)
            })
            return response.status(200).json(categoryExpenseArray);
        }
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});
