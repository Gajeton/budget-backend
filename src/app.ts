import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { CategoryExpenseRouter } from "./categorie-expense/categorie-expense.router";
import { CategoryIncomeRouter } from "./categorie-income/categorie-income.router";
import { UserRouter } from "./user/user.router";
import { DestinationRouter } from "./destination/destination.router";
import { TravelRouter } from "./travel/travel.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categoryIncome", CategoryIncomeRouter);
app.use("/api/categoryExpense", CategoryExpenseRouter);
app.use("/api/destination", DestinationRouter);
app.use("/api/travel", TravelRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});