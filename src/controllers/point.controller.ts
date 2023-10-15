import { Request, Response } from "express";
import { db } from '../database'
import { Point } from '../models'

export const getById = async (req:Request , res:Response) => {
    const { id } = req.params
    try {
        await db.connect()
        const point = await Point.findById(id);
        await db.disconnect()
        res.json({ point });
    } catch (error) {
        res.json({ "message": "No hay punto con ese ID"})
    }
}

export const getAll = async (req:Request , res:Response) => {
    try {
        await db.connect()
        const point = await Point.find({})
        await db.disconnect()
        res.json({ point });
    } catch (error) {
        res.json({ "message": "No hay punto"})
    }
}