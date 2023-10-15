import { Schema } from "mongoose";

export interface IOrder {
    type: string;
    description: string;
    route: {
        pickup: string;
        dropoff: string;
    };
    status: 'En Progreso' | 'Completada' | 'Cancelada';
    truckId: Schema.Types.ObjectId ;
    routeId: Schema.Types.ObjectId ;
}