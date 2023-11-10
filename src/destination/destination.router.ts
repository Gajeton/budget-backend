import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as DestinationService from "./destination.service";

export const DestinationRouter = express.Router();

DestinationRouter.get("/", async (request: Request, response: Response) => {
  try {
    const destinations = await DestinationService.getDestinations(request.params.idAuth0);
    return response.status(200).json(destinations);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

DestinationRouter.post("/create_destination", async (request: Request, response: Response) => {
  const { title } = request.body;
  try {
    const destinations = await DestinationService.createDestination({ title: title });
    return response.status(200).json(destinations);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

DestinationRouter.delete("/delete_destination/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const destinations = await DestinationService.deleteDestination(id);
    return response.status(200).json(destinations);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
