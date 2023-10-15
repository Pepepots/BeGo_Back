import { Request, Response } from "express";
import { db } from '../database'
import { Truck, Route, Order } from '../models'
import { ITruck, IOrder } from "../interfaces";

export const createRoute = async (req:Request , res:Response) => {
    const {  } = req.body

    try {
       

    } catch (error) {
        return res.status(406).json({
            "mesage": error
        })
    }
}

export const getAll = async (req:Request , res:Response) => {
    await db.connect()
    const orders:IOrder[] = await Order.find({})
    await db.disconnect()
    return res.json({ orders });
}

export const getById = async (req:Request , res:Response) => {
    const { id } = req.params

    try {
        await db.connect()
        const order:IOrder|null = await Order.findById(id);
        await db.disconnect()
        return res.json({ order });
    } catch (error) {
        return res.json({ "orders": [] })
    }
}

export const deleteById = async (req:Request , res:Response) => {
    const { id } = req.params

    try {
        await db.connect()
        await Order.findByIdAndDelete(id);
        await db.disconnect()
        return res.json({ "Mesagge": `La ruta con el ${id} se elimino` });
    } catch (error) {
        return res.json({ "message": "No se pudo eliminar" })
    }
}

export const updateRoute = async (req:Request , res:Response) => {
    const { id, from, to } = req.body

    try {
        await db.connect()
        
        await db.disconnect()



    } catch (error) {
        return res.status(406).json({
            "mesage": error
        })
    }
}