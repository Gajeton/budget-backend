import { CategoryExpense, CategoryIncome, Destination, Entry, TravelCategoryExpense, TravelDestination } from "@prisma/client"
import { Moment } from "moment"

export type TravelWithDestination = {
    id: number,
    startDate : Moment,
    endDate: Moment,
    destination: TravelDestinationWithObject[]
}

export type TravelDestinationWithObject = {
    destination: Destination
}

export type EntriesWithCategoryExpenseIncome = {
    data: EntryWithCategoryExpenseIncome[] | null,
    nbTotal: number
    nbExpense : number
    nbIncome: number
    total: number
    totalExpense : number
    totalIncome: number
    balanceIncome: number
}

export interface BudgetDetailExpenseItemData {
    categoryExpenseId: number,
    travelId: number,
    categoryTitle: string,
    entrysAmount: number

}

export interface BudgetDetailExpense {
    data: BudgetDetailExpenseItemData
    count: number
}

export type EntryWithCategoryExpenseIncome = {
    id: number,
    categoryExpense : CategoryExpense,
    categoryIncome: CategoryIncome,
    ammount: number
}

// export interface BudgetDetailExpenseItemData {
//     categoryExpenseId: number,
//     travelId: number,
//     categoryTitle: string,
//     entrysAmount: number,
// }

export interface BudgetDetailIncomeItemData {
    totalExpense: number;
    totalEstimated : number;
    balance: number;
}

export interface BudgetDetailExpenseData {
    travelCategoryExpense: TravelCategoryExpenseDto[];
}

export interface BudgetDetailIncomeData {
    travelCategoryIncome: TravelCategoryIncomeDto[];
}

export interface TravelCategoryExpenseDto {
    categoryExpense: CategoryExpense;
}
export interface TravelCategoryIncomeDto {
    categoryIncome : CategoryIncome
}




export interface CreateEntryProps {
    amount: number
    idAuth0: string
    currencyId: number
    date : Moment
    title:string
    categorieExpenseId?: number
    categorieIncomeId?: number
    travelId : number
  }

export type Travel = {
    id: number
    creatorId: number
    budget : number
    month: number
    week: number
    day: number
}


export type TravelMonth = {
    id: number,
    startDate : Moment,
    endDate: Moment,
    month: number
}


export type TravelWeek = {
    id: number,
    startDate : Moment,
    endDate: Moment,
    week: number
}

export type TravelDay = {
    id: number,
    startDate : Moment,
    endDate: Moment,
    day: number
}

export interface GetTravels {
    id: number,
    destination: string[]
    startDate: Moment,
    endDate: Moment
}

export interface BudgetMonthDetail {
    total : number
    nbTotal : number
    expenses : ExpensesDetail[]
    incomes : IncomesDetail[]
  }
  
export interface ExpensesDetail {
    id : number,
    category : CategoryExpense
  }
  
export interface IncomesDetail {
    id : number,
    category : CategoryIncome
  }

