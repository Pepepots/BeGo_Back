import { Request, Response } from "express";
import { db } from '../database'
import { Point, Route, Order } from '../models'
import { IPoint, IRoute, IOrder } from "../interfaces";
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
    const routes:IRoute[] = await Route.find({})
    await db.disconnect()
    return res.json({ routes });
}

export const getById = async (req:Request , res:Response) => {
    const { id } = req.params

    try {
        await db.connect()
        const route:IRoute|null = await Route.findById(id);
        await db.disconnect()
        return res.json({ route });
    } catch (error) {
        return res.json({ "routes": [] })
    }
}

export const deleteById = async (req:Request , res:Response) => {
    const { id } = req.params

    try {
        await db.connect()
        await Route.findByIdAndDelete(id);
        const OrderInProgress:IOrder[]|null = await Order.find({ status: "En Progreso", routeId: id });
        await db.disconnect()

        // Valida si esta asignada a orden
        if ( OrderInProgress.length > 0 ) {
            await db.disconnect()
            return res.json({ "message": "No se puede eliminar por que tienes una Orden En Progreso" })
        }
        await db.disconnect()
        return res.json({ "mesagge": `La ruta con el ${id} se elimino` });
    } catch (error) {
        await db.disconnect()
        return res.json({ "message": "No se pudo eliminar" })
    }
}

export const updateRoute = async (req:Request , res:Response) => {
    const { id } = req.params
    const { from, to } = req.body

    try {
        await db.connect()
        const currentRoute:IRoute|null = await Route.findOne({ _id: id})
        const From:IPoint|null = await Point.findOne({ "location.name" : from })
        const To:IPoint|null = await Point.findOne({ "location.name" : to })
        const RepiteRoute:IRoute|null = await Route.findOne({ from, to })
        const OrderInProgress:IOrder[]|null = await Order.find({ status: "En Progreso", routeId: id });


        //Valida que exista una ruta a modificar
        if (!currentRoute) {
            await db.disconnect()
            throw "No hay ruta con ese Id"
        }

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

        // Valida si esta asignada a orden
        if ( OrderInProgress.length > 0 ) {
            await db.disconnect()
            throw "Esta ruta tiene una orden En Progreso"
        }
        

        const idFrom = From.location.placeId
        const locationFrom = await maps.getCoordinates(idFrom)
        
        const idTo = To.location.placeId
        const locationTo = await maps.getCoordinates(idTo)
    
        const kmInRoute = await maps.getKm(idFrom, idTo)
        const parceKM = Number(kmInRoute.value / 1000).toFixed(0)

        currentRoute.from = from
        currentRoute.to = to
        currentRoute.coordinates = {
            from: [ locationFrom.lat,locationFrom.lng ],
            to: [ locationTo.lat, locationTo.lng ]
        } 
        
        currentRoute.distance = Number(parceKM)
        await currentRoute.save()
        await db.disconnect()
        
        return res.json({
            currentRoute
        })

    } catch (error) {
        return res.status(406).json({
            "mesage": error
        })
    }
}