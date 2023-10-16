import { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    type: 'Aereo' | 'Maritimo' | 'Terrestre';
    description: string;
    route: {
        pickup: string;
        dropoff: string;
    };
    status: 'Creada' |'En Progreso' | 'Completada';
    truckId: Schema.Types.ObjectId ;
    routeId: Schema.Types.ObjectId ;
}