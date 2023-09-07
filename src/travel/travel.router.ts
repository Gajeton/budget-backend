import type { Request, Response } from "express";
import express from "express";

import * as TravelService from "./travel.service";


export const TravelRouter = express.Router();

// GET: List of all Authors
TravelRouter.get("/getTravelById/:travelId/:creatorId", async (request: Request, response: Response) => {
    const travelId = parseInt(request.params.travelId)
    try {
        const travel: any = await TravelService.getTravelById(travelId);
        return response.status(200).json(...travel);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getTravelDetailById/:travelId", async (request: Request, response: Response) => {
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

TravelRouter.get("/getTravels/:idAuth0", async (request: Request, response: Response) => {
    try {
        const travels = await TravelService.getTravels(request.params.idAuth0);
        return response.status(200).send(travels)
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.post("/createTravel", async (request: Request, response: Response) => {
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

TravelRouter.get("/getCategoryIncomeByTravelId/:travelId", async (request: Request, response: Response) => {
    try {
        const categoryIncomes = await TravelService.getCategoryIncomeByTravelId({ travelId: parseInt(request.params.travelId) });
        const categoryIncomesJson = JSON.stringify(categoryIncomes, (_, v) => typeof v === 'bigint' ? parseFloat(v.toString()) : v)
        return response.status(200).json(categoryIncomesJson);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getCategoryExpenseByTravelId/:travelId", async (request: Request, response: Response) => {
    try {
        const categoryExpenses = await TravelService.getCategoryExpenseByTravelId({ travelId: parseInt(request.params.travelId) });
        console.log(categoryExpenses)
        const categoryExpensesJson = JSON.stringify(categoryExpenses, (_, v) => typeof v === 'bigint' ? parseFloat(v.toString()) : v)
        return response.status(200).send(categoryExpensesJson);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

TravelRouter.get("/getNumberOfWeeks/:travelId/:creatorId", async (request: Request, response: Response) => {
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


