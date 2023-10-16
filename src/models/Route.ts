import mongoose, { Model, Schema, model } from "mongoose";
import { IRoute } from "../interfaces";

const routeSchema = new Schema<IRoute>({
    from: { type: String, required: true },
    to: { type: String, required: true },
    coordinates: { 
        from: { type: [ Number, Number ], required: true},
        to: { type: [ Number, Number ], required: true}
    },
    distance: { type: Number,required: true}
})

const Route:Model<IRoute> = mongoose.models.Route || model('Route', routeSchema );

export default Route;
