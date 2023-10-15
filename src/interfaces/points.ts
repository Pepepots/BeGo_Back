interface Location {
    name: string;
    placeId: string;
}

export interface IPoint extends Document {
    _id: string;
    Location: Location;
}