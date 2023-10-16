import mongoose, { Model, Schema, model } from "mongoose";
import { ITruck } from "../interfaces";


const truckSchema = new Schema<ITruck>({
    modelo: { type: String, required: true },
    make: { type: String, required: true },
    year: { type: Number, required: true},
    color: { type: String, required: true },
    transportWeight: { type: Number, required: true },
    created_at: { type: Date, required: true }
});

const Truck:Model<ITruck> = mongoose.models.Truck || model('Truck', truckSchema);

export default Truck;