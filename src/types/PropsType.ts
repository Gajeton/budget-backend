import { Moment } from "moment"

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

export interface GetExpensesByProps { type: number, idAuth0: string }

export interface GetEntryByCategoryIncomeAndTravelIdProps { travelId: number, categoryIncomeId: number }
export interface GetEntryByCategoryExpenseAndTravelIdProps { travelId: number, categoryExpenseId: number }