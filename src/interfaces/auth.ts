import { Request } from "express";
import { JwtPayload } from 'jsonwebtoken'

export interface CustomPayload extends JwtPayload {
    correo: string;
}

export interface CustomRequest extends Request {
    correo: string;
}