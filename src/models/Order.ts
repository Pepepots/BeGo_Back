import mongoose, { Model, Schema, model } from "mongoose";
import { IOrder } from "../interfaces";


const orderSchema = new Schema<IOrder>({
    type: { type: String, required: true, enum: { values: ['Aereo', 'Maritimo', 'Terrestre'], message: "Tipo no valido" } },
    description: { type: String, required: true },
    route: {
        pickup: { type: String, required: true },
        dropoff: { type: String, required: true },
    },
    status: { type: String, required: true,  enum: { values: [ 'En Progreso', 'Completada', 'Creada' ], message: "Status no valido"}},
    truckId: { type: Schema.Types.ObjectId, ref: "Truck", required: true },
    routeId: { type: Schema.Types.ObjectId, ref: "Route", required: true }
});

const Order:Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;