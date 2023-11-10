import type { Request, Response } from "express";
import express from "express";

import * as TravelService from "./travel.service";


export const TravelRouter = express.Router();

TravelRouter.get("/", async (request: Request, response: Response) => {
    try {
        const travels = await TravelService.getTravels();
        const travelsJson = JSON.stringify(travels, (_, v) => typeof v === 'bigint' ? parseFloat(v.toString()) : v)
        return response.status(200).send(travelsJson)
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/:travelId", async (request: Request, response: Response) => {
    const travelId = parseInt(request.params.travelId)
    try {
        const travel: any = await TravelService.getTravelById(travelId);
        return response.status(200).json(...travel);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/travel_detail/:travelId", async (request: Request, response: Response) => {
    const travelId = parseInt(request.params.travelId)
    try {
        const travel: any = await TravelService.getTravelDetailById(travelId);
        const json = [...travel].shift();
        const travelsJson = JSON.parse(JSON.stringify(json, (_, v) => typeof v === 'bigint' ? parseFloat(v.toString()) : v))
        return response.status(200).json(travelsJson);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.post("/create_travel", async (request: Request, response: Response) => {
    const { ...travel } = request.body;
    const travelToCreate = { ...travel }
    try {
        const travels = await TravelService.createTravel(travelToCreate);
        if(travels) {
            travelToCreate.categoryExpenseId.map(async (x : number) => await TravelService.createTravelCategoryExpense(x, travels.id))
            travelToCreate.categoryIncomeId.map(async (x : number) => await TravelService.createTravelCategoryIncome(x, travels.id))
        }
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/category_income/:travelId", async (request: Request, response: Response) => {
    try {
        const categoryIncomes = await TravelService.getCategoryIncomeByTravelId({ travelId: parseInt(request.params.travelId) });
        const categoryIncomesJson = JSON.stringify(categoryIncomes, (_, v) => typeof v === 'bigint' ? parseFloat(v.toString()) : v)
        return response.status(200).json(categoryIncomesJson);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/category_expense/:travelId", async (request: Request, response: Response) => {
    try {
        const categoryExpenses = await TravelService.getCategoryExpenseByTravelId({ travelId: parseInt(request.params.travelId) });
        console.log(categoryExpenses)
        const categoryExpensesJson = JSON.stringify(categoryExpenses, (_, v) => typeof v === 'bigint' ? parseFloat(v.toString()) : v)
        return response.status(200).send(categoryExpensesJson);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/number_of_weeks/:travelId", async (request: Request, response: Response) => {
    const travelId: number = parseInt(request.params.travelId, 10);
    try {
        const travels = await TravelService.getNumberOfWeeks({ creatorId: request.params.creatorIdatorId, travelId: travelId });
        return response.status(200).json(travels);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// TravelRouter.get("/getNumberOfMonths/:travelId/:creatorId", async (request: Request, response: Response) => {
//     const travelId: number = parseInt(request.params.travelId, 10);
//     try {
//         const travels = await TravelService.getNumberOfMonths({ creatorId: request.params.creatorIdatorId, travelId: travelId });
//         return response.status(200).json(travels);
//     } catch (error: any) {
//         return response.status(500).json(error.message);
//     }
// });

// TravelRouter.get("/getNumberOfDays/:travelId/:creatorId", async (request: Request, response: Response) => {
//     const travelId: number = parseInt(request.params.travelId, 10);
//     try {
//         const travels = await TravelService.getNumberOfDays({ creatorId: request.params.creatorIdatorId, travelId: travelId });
//         return response.status(200).json(travels);
//     } catch (error: any) {
//         return response.status(500).json(error.message);
//     }
// });


