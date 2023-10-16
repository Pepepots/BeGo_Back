import mongoose, { Model, Schema, model } from "mongoose";
import { ITruck } from "../interfaces";


const truckSchema = new Schema<ITruck>({
    modelo: { type: String },
    make: { type: String },
    year: { type: Number },
    color: { type: String },
    transportWeight: { type: Number },
    created_at: { type: Date }
});

const Truck:Model<ITruck> = mongoose.models.Truck || model('Truck', truckSchema);

export default Truck;