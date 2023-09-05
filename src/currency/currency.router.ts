import type { Request, Response } from "express";
import express from "express";

import * as CurrencyService from "./currency.service";
export const CurrencyRouter = express.Router();

CurrencyRouter.get("/getCurrencies", async (request: Request, response: Response) => {
    try {
        const currencies = await CurrencyService.getCurrencies();
        return response.status(200).json(currencies);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});