import mongoose, { Model, Schema, model } from "mongoose";
import { IRoute } from "../interfaces";

const routeSchema = new Schema<IRoute>({
    from: { type: String },
    to: { type: String },
    coordinates: { 
        from: { type: [ Number, Number ] },
        to: { type: [ Number, Number ] }
    },
    distance: { type: Number}
})

const Route:Model<IRoute> = mongoose.models.Route || model('Route', routeSchema );

export default Route;
