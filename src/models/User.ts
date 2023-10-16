import mongoose, { Model, Schema, model } from "mongoose";
import { IUser } from "../interfaces";


const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, }
});

const User:Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;