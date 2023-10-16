import { Document } from "mongoose";

interface Coordinates {
    from: [number, number];
    to: [number, number];
}

export interface IRoute extends Document {
    from: string;
    to: string;
    coordinates: Coordinates;
    distance: number;
}