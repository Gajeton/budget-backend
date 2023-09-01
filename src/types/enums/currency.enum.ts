// export enum Currency {
//     EUR
// }


// // Define an object type that maps enum values to objects


// // Create an object with information about each fruit
// export const currencyInfo: CurrencyInfo = {
//     [Currency.EUR]: {
//         id: 1,
//         label: "Euros",
//         symbol: "€"
//     },
// };

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    JPY = 'JPY',
}

export interface CurrencyProps {
    id: number,
    label: string,
    symbol: string
}

export type CurrencyInfo = {
    [Currency.USD]: CurrencyProps
    [Currency.EUR]: CurrencyProps,
    [Currency.GBP]: CurrencyProps,
    [Currency.JPY]: CurrencyProps,
};

export const currencyInfo : CurrencyInfo =  {
    [Currency.USD]: { id: 1, label: 'US Dollar', symbol: '$' },
    [Currency.EUR]: { id: 2, label: 'Euro', symbol: '€' },
    [Currency.GBP]: { id: 3, label: 'British Pound', symbol: '£' },
    [Currency.JPY]: { id: 4, label: 'Japanese Yen', symbol: '¥' },
};