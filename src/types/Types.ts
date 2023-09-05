import { Moment } from "moment";

export interface GetProps {
    travelId: number,
    creatorId: string
}

export interface CreateCategorieExpenseProps {
    title: string;
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
    startDate : Moment
    endDate: Moment
    month : number
    week : number
    day : number
    budget:number
}


