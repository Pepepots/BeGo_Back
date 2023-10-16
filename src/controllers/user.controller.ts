import { Request, Response } from "express";
import { db } from '../database'
import { IUser } from '../interfaces/user';
import { User } from "../models";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body


    await db.connect()
    const user: IUser[] = await User.find({ email })

    if (user.length > 0) {
        await db.disconnect()
        return res.status(403).json({
            "message": "El email ya esta registrado"
        })
    }

    try {

        const salt = await bcrypt.genSalt(12);
        const hashPws = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashPws
        });

        await newUser.save()
        await db.disconnect()

        return res.status(200).json({
            newUser
        })
    } catch (error) {
        return res.status(400).json({ error })
    }


}