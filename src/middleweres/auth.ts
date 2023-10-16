import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { CustomPayload, CustomRequest } from "../interfaces";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.header('auth-token');

        if (!token) return res.status(401).json({ "message": "Acceso denegado" })

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'pruebas') as CustomRequest;
        (req as CustomRequest).correo = payload.correo
        next()
    } catch (error) {
        res.status(400).json({ "message": "Token invalido"})
    }

}