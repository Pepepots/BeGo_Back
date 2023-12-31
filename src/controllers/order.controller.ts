import { Request, Response } from "express";
import { db } from '../database'
import { Truck, Route, Order } from '../models'
import { ITruck, IOrder, IRoute } from "../interfaces";

export const createOrder = async (req: Request, res: Response) => {
    const { type, description, truckId, routeId } = req.body


    try {
        await db.connect()
        const truck: ITruck | null = await Truck.findById(truckId);
        const route: IRoute | null = await Route.findById(routeId);

        // Valida que existan un truck y una route
        if (!(truck && route)) {
            await db.disconnect()
            throw "Falta rout o truck"
        }

        const newOrder = new Order({
            type,
            description,
            route: {
                pickup: route.from,
                dropoff: route.to
            },
            status: "Creada",
            truckId,
            routeId

        })

        try {
            await newOrder.save()
            await db.disconnect()
        } catch (error) {
            await db.disconnect()
            return res.json({ "message": error })
        }

        return res.json({
            newOrder
        })

    } catch (error) {
        await db.disconnect()
        return res.status(406).json({
            "message": error
        })
    }
}

export const getAll = async (req: Request, res: Response) => {
    await db.connect()
    const orders: IOrder[] = await Order.find({})
    await db.disconnect()
    return res.json({ orders });
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await db.connect()
        const order: IOrder | null = await Order.findById(id);
        await db.disconnect()
        return res.json({ order });
    } catch (error) {
        return res.json({ "order": [] })
    }
}

export const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await db.connect()
        const order:IOrder|null =  await Order.findById(id);
        await db.disconnect()

        if (!order) {
            await db.disconnect()
            return res.json({ "message": "No hay orden con ese ID" })
        }

        if (order.status === "En Progreso") {
            await db.disconnect()
            return res.json({ "message": "No se puede eliminar una orden En Progreso" })
        }

        try {
            await db.connect()
            await Order.findByIdAndDelete(id);
            await db.disconnect()
            return res.json({ "Mesagge": `La orden con el ${id} se elimino` });
        } catch (error) {
            await db.disconnect()

            return res.json({ "message": "No se pudo eliminar" })
        }
    } catch (error) {
        await db.disconnect()
        return res.json({ "message": "No hay orden con ese ID" })
    }

}

export const updateOrder = async (req: Request, res: Response) => {

    const { id } = req.params
    const { type, description, truckId, routeId, status } = req.body

    try {
        await db.connect()
        const order:IOrder|null =  await Order.findById(id);
        const truck: ITruck | null = await Truck.findById(truckId || order?.truckId);
        const route: IRoute | null = await Route.findById(routeId || order?.routeId);

        if (!order) {
            await db.disconnect()
            return res.json({ "message": "No hay orden con ese ID" })
        }

        if (order.status === "En Progreso") {
            await db.disconnect()
            return res.json({ "message": "No se puede modificar una orden En Progreso" })
        }

        if (!(truck && route)) {
            await db.disconnect()
            throw "Falta rout o truck"
        }

        order.type = type || order.type
        order.description  = description || order.description
        order.route =  {
                pickup: route.from,
                dropoff: route.to
            }
        order.status = status || order.status
        order.truckId = truck.id
        order.routeId = route.id
        await order.save()
        await db.disconnect()

        return res.json({ 
            order
        })

    } catch (error) {
        return res.status(406).json({
            "mesage": error
        })
    }
}

export const completeOrder = async (req:Request, res:Response) => {
    const { id } = req.params

    try {
        await db.connect()
        const order:IOrder|null =  await Order.findById(id);
        await db.disconnect()
        
        if (!order) {
            await db.disconnect()
            return res.json({ "message": "No hay orden con ese ID" })
        }

        order.status = "Completada"
        order.save()

        return res.json({
            order
        })

    }catch (err) {
        return res.json({ "message": "No hay orden con ese ID" })
    }
}