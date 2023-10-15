import mongoose, { Model, Schema, model } from "mongoose";
import { IPoint } from "../interfaces";


const pointSchema = new Schema<IPoint>({
    location: {
        name: 'string',
        placeId: 'string'
    }
});

const Point:Model<IPoint> = mongoose.models.Point || model('Point', pointSchema);

export default Point;