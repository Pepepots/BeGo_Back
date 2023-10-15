import mongoose, { Model, Schema, model } from "mongoose";
import { IOrder } from "../interfaces";


const orderSchema = new Schema<IOrder>({
    type: { type: String },
    description: { type: String },
    route: {
        pickup: { type: String },
        dropoff: { type: String },
    },
    status: { type: String,  enum: { values: [ 'En Progreso', 'Completada', 'Cancelada' ], message: "status no valido"}},
    truckId: { type: Schema.Types.ObjectId, ref: "Truck" },
    routeId: { type: Schema.Types.ObjectId, ref: "Route" }
});

const Order:Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;