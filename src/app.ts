import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { CategorieExpenseRouter } from "./categorie-expense/categorie-expense.router";
import { UserRouter } from "./user/user.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categorieExpense", CategorieExpenseRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});