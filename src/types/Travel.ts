interface Travel {
    id:     Number
    destination: TravelDestination[]
    creator: User
    creatorId: Number
    entry: Entry[]
    month: Number
    week: Number
    day: Number
}

interface TravelDestination {
    id:     Number
   
}


interface User {
    id:     Number
   
}


interface Entry {
    id:     Number
   
}