import { Document } from "mongoose";

export interface ITruck extends Document{
    _id: string;
    modelo: string;
    make: string;
    year: number;
    color: string;
    transportWeight: number;
    created_at: Date;
}