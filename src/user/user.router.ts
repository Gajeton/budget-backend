import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserRouterService from "./user.service";

export const UserRouter = express.Router();

// GET: List of all Authors
UserRouter.post("/createUser", async (request: Request, response: Response) => {
  const { idAuth0, name } = request.body
  try {
    const user = await UserRouterService.createUser({ idAuth0, name });
    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
