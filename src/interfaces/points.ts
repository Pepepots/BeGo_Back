import { Document } from "mongoose";

interface Location {
    name: string;
    placeId: string;
}

export interface IPoint extends Document{
    _id: string;
    location: Location;
}