import { Request, Response } from "express";
import { db } from '../database'
import { Point, Route } from '../models'
import { IPoint, IRoute } from "../interfaces";
import { maps } from "../helpers";

export const createRoute = async (req:Request , res:Response) => {
    const { from="", to="" } = req.body

    await db.connect()
    const [ From ]:IPoint[] = await Point.find({ "location.name" : from })
    const [ To ]:IPoint[] = await Point.find({ "location.name" : to })
    await db.disconnect()
    
    const idFrom = From.location.placeId
    const locationFrom = await maps.getCoordinates(idFrom)
    
    const idTo = To.location.placeId
    const locationTo = await maps.getCoordinates(idTo)


    return res.json({
        idFrom,
        locationFrom,

        idTo,
        locationTo
    })
}

export const getAll = async (req:Request , res:Response) => {
    
    await db.connect()
    const points:IRoute[] = await Route.find({})
    await db.disconnect()
    return res.json({ points });
}
