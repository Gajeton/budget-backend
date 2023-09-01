import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as TravelService from "./travel.service";
import { Prisma } from "@prisma/client";
import moment, { Moment } from "moment";
import { TravelDestinationWithObject, TravelWithDestination } from "../types/Travel";

export const TravelRouter = express.Router();

interface GetTravels {
    destination: string[]
    startDate: Moment,
    endDate: Moment
}

type TravelsWithDestination = Prisma.PromiseReturnType<typeof TravelService.getTravels>

// GET: List of all Authors
TravelRouter.get("/getTravels/:idAuth0", async (request: Request, response: Response) => {
    try {
        const travels: TravelWithDestination[] = await TravelService.getTravels(request.params.idAuth0);
        if (travels) {
            const travelsFormated: GetTravels[] = []
            travels.map(res => {
                const travelsFormatedItem : GetTravels = {
                    destination: [],
                    startDate: moment(),
                    endDate: moment()
                }
                travelsFormatedItem.startDate = res.startDate
                travelsFormatedItem.endDate = res.endDate
                
                res.destination.map(x => {
                    if(x.destination) {
                        console.log(x.destination)
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
    try {
        const travels = await TravelService.createTravel({ ...travel });
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
