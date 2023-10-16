import { Document } from "mongoose";

interface Coordinates {
    from: [number, number];
    to: [number, number];
}

export interface IRoute extends Document {
    _id: string;
    from: string;
    to: string;
    coordinates: Coordinates;
    distance: number;
}