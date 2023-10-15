import { Request, Response } from "express";
import { db } from '../database'
import { Truck } from '../models'
import { ITruck } from "../interfaces";

export const getById = async (req:Request , res:Response) => {
    const { id } = req.params
    try {
        await db.connect()
        const truck:ITruck|null = await Truck.findById(id);
        await db.disconnect()
        return res.json({ truck });
    } catch (error) {
        return res.json({ "trucks": [] })
    }
}

export const getAll = async (req:Request , res:Response) => {
        await db.connect()
    const trucks:ITruck[] = await Truck.find({})
    await db.disconnect()
    return res.json({ trucks });
}
