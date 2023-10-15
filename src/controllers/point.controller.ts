import { Request, Response } from "express";
import { db } from '../database'
import { Point } from '../models'

export const getById = async (req:Request , res:Response) => {
    const { id } = req.params
    try {
        await db.connect()
        const point = await Point.findById(id);
        await db.disconnect()
        res.send(point);
    } catch (error) {
        res.send({ "message": "No hay punto"})
    }
}

export const getAll = async (req:Request , res:Response) => {
    try {
        await db.connect()
        const point = await Point.find({})
        await db.disconnect()
        res.send(point);
    } catch (error) {
        res.send({ "message": "No hay punto"})
    }
}