import { Request, Response } from "express";
import { db } from '../database'
import { Route } from '../models'
import { IRoute } from "../interfaces";

export const createRoute = async (req:Request , res:Response) => {
}

export const getAll = async (req:Request , res:Response) => {
    
    await db.connect()
    const points:IRoute[] = await Route.find({})
    await db.disconnect()
    return res.json({ points });
}
