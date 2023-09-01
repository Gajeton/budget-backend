import { Destination, TravelDestination } from "@prisma/client"
import { Moment } from "moment"

export type TravelWithDestination = {
    id: number,
    startDate : Moment,
    endDate: Moment,
    destination: TravelDestinationWithObject[]
}

// 2: Define a type that only contains a subset of the scalar fields
export type TravelDestinationWithObject = {
    destination: Destination
}