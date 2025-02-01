import { Request, Response, NextFunction } from 'express';
import {ResponseStatus} from "../utils/values"
import jwt from "jsonwebtoken"

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const receivedToken = req.header('Authorization')?.split(" ")[1]
        if (receivedToken){
            try {
                await jwt.verify(receivedToken, process.env.JWT_PASSWORD||"")
                await next()
            } catch (error) {
                res.status(ResponseStatus.clientError).json({msg: "Unauthorized", success: false})
            }
        }else{
            res.status(ResponseStatus.clientError).json({msg: "Didn't Receive Token", success: false})
        }
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({msg: "Unauthorized", success: false})
    }
}