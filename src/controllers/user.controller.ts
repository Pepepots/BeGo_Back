import { Request, Response } from "express";
import { db } from '../database'
import { IUser } from '../interfaces/user';
import { User } from "../models";
import 'dotenv/config'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            "message": "Usuario registrado"
        })
    } catch (error) {
        return res.status(400).json({ error })
    }


}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
        await db.connect()
        const user: IUser | null = await User.findOne({ email })
        await db.disconnect()

        if (!user) {
            await db.disconnect()
            return res.status(403).json({
                "message": "email or password incorrectos"
            })
        }

        const validatePassword = await bcrypt.compare( password, user.password )
        if (!validatePassword) {return res.status(400).json({ error: 'Password incorrecta' })}

        const tokenSecret = process.env.TOKEN_SECRET as string

        const token = jwt.sign({email: user.email}, tokenSecret, { algorithm: 'HS256', expiresIn: '30m'})

        res.header('auth-token', token).json({
            token
        })

    } catch (error) {
        await db.disconnect()
        res.status(400).json({ error: error });
    }

}