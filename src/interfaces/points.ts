interface Location {
    name: string;
    placeId: string;
}

export interface IPoint {
    _id: string;
    location: Location;
}