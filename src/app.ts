import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { CategoryExpenseRouter } from "./categorie-expense/categorie-expense.router";
import { CategoryIncomeRouter } from "./categorie-income/categorie-income.router";
import { UserRouter } from "./user/user.router";
import { DestinationRouter } from "./destination/destination.router";
import { TravelRouter } from "./travel/travel.router";
import { EntryRouter } from "./entry/entry.router";
import { CurrencyRouter } from "./currency/currency.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categoryIncomes", CategoryIncomeRouter);
app.use("/api/categoryExpenses", CategoryExpenseRouter);
app.use("/api/destinations", DestinationRouter);
app.use("/api/travels", TravelRouter);
app.use("/api/entries", EntryRouter);
app.use("/api/currencies", CurrencyRouter);
app.use("/api/users", UserRouter);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});