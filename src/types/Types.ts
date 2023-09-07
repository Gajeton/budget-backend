import { CategoryExpense, CategoryIncome, Destination } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Moment } from "moment";

export interface GetProps {
    travelId: number,
    creatorId: string
}

export interface CreateCategoryProps {
    title: string;
}

export interface UserProps {
    idAuth0: string,
    name?: string
}

export interface CreateTravelProps {
    destinationId: number;
    idAuth0: string
    currencyId: string
    startDate: Moment
    endDate: Moment
    month: number
    week: number
    day: number
    budget: number
}

export interface BudgetDetailExpenseItemData {
    categoryExpenseId: number,
    travelId: number,
    categoryTitle: string,
    entrysAmount: number
}

export type EntryWithCategoryExpenseIncome = {
    id: number,
    categoryExpense: CategoryExpense,
    categoryIncome: CategoryIncome,
    ammount: number
}

export interface BudgetDetailIncomeItemData {
    totalExpense: number;
    totalEstimated: number;
    balance: number;
}

export type TravelMonthType = {
    id: number,
    startDate: Moment,
    endDate: Moment,
    month: number
}

export type TravelWeekType = {
    id: number,
    startDate: Moment,
    endDate: Moment,
    week: number
}

export type TravelDayType = {
    id: number,
    startDate: Moment,
    endDate: Moment,
    day: number
}

export type CategoryIncomeByTravelIdType = {
    categoryIncomeId: number,
    id: number,
    travelId: number,
    categoryTitle: string
    entrysAmount: bigint
}

export type CategoryExpenseByTravelIdType = {
    categoryExpenseId: number,
    id: number,
    travelId: number,
    categoryTitle: string
    entrysAmount: bigint
}

export type GetTravelByIdType = {
    id: number,
    startDate: Moment,
    endDate: Moment,
    totalBudget: Decimal,
    budget: number,
    day: number
}

export type GetTravelDetailByIdType = {
    id: number,
    startDate: Moment,
    endDate: Moment,
    nbIncome: bigint,
    nbExpense: bigint,
    totalIncome: Decimal
    totalExpense: Decimal
}

export type GetTravelsType = {
    id: number,
    startDate: Moment,
    endDate: Moment,
    totalIncome: BigInt,
    totalExpense: BigInt,
    destination: string
}

export interface CreateEntryProps {
    amount: number
    idAuth0: string
    currencyId: number
    date: Moment
    title: string
    categorieExpenseId?: number
    categorieIncomeId?: number
    travelId: number
}
