import { Request, Response } from "express";
import { db } from '../database'
import { Point, Route } from '../models'
import { IPoint, IRoute } from "../interfaces";
import { maps } from "../helpers";

export const createRoute = async (req:Request , res:Response) => {
    const { from, to } = req.body

    try {
        await db.connect()
        const From:IPoint|null = await Point.findOne({ "location.name" : from })
        const To:IPoint|null = await Point.findOne({ "location.name" : to })
        const RepiteRoute:IRoute|null = await Route.findOne({ from, to })

        // Valida que existan los dos puntos
        if (!(From && To)){
            await db.disconnect()
            throw "Parametros invalido en el body"
        }

        // Valida si ya existe una ruta
        if (RepiteRoute){
            await db.disconnect()
            throw "Ya existe una ruta"
        }

        const idFrom = From.location.placeId
        const locationFrom = await maps.getCoordinates(idFrom)
        
        const idTo = To.location.placeId
        const locationTo = await maps.getCoordinates(idTo)
    
        const kmInRoute = await maps.getKm(idFrom, idTo)
    
        const newRoute = new Route({
            from, 
            to, 
            coordinates:{
                from: [ locationFrom.lat,locationFrom.lng ],
                to: [ locationTo.lat, locationTo.lng ]
            },
            distance: Number(kmInRoute.value / 1000).toFixed(0)
        })
        
        await newRoute.save().catch( err => res.json({ "message": "Algo salio mal"})) 
        
        return res.json({
            newRoute
        })

    } catch (error) {
        return res.status(406).json({
            "mesage": error
        })
    }
}

export const getAll = async (req:Request , res:Response) => {
    
    await db.connect()
    const points:IRoute[] = await Route.find({})
    await db.disconnect()
    return res.json({ points });
}
