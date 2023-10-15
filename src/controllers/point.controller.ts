import { Request, Response } from "express";
import { db } from '../database'
import { Point } from '../models'
import { IPoint } from "../interfaces";

export const getById = async (req:Request , res:Response) => {
    const { id } = req.params
    try {
        await db.connect()
        const point:IPoint|null = await Point.findById(id);
        await db.disconnect()
        return res.json({ point });
    } catch (error) {
        return res.json({ "points": [] })
    }
}

export const getAll = async (req:Request , res:Response) => {
    
    await db.connect()
    const points:IPoint[] = await Point.find({})
    await db.disconnect()
    return res.json({ points });
}

export const getByName = async (req:Request , res:Response) => {
    const { name } = req.query
    console.log(name);

    await db.connect()
    const points:IPoint[] = await Point.find({ "location.name": name })
    await db.disconnect()


    return res.json({ points });

}