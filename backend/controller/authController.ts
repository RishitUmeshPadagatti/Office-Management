import {Request, Response} from "express"
import { ResponseStatus } from "../utils/values"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import {formatJsonToExcludePasswordAndBigint} from "../utils/functions"

const prisma = new PrismaClient()

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body
        
        if (username === "admin" && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({username: "admin"}, process.env.JWT_PASSWORD||"")
            res.status(ResponseStatus.success).json({msg: "Admin Successfully Logged In", success: true, token: `Bearer ${token}`})
        }
        else{
            res.status(ResponseStatus.clientError).json({msg: "Incorrect username or password", success: false})
        }

    } catch (error) {
        console.error(error)
        res.status(ResponseStatus.internalServerError).json({msg: "Internal Server Error", success: false})
    }
}

export const loginEmployee = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body

        const result = await prisma.employee.findFirst({where: {email: email, password: password}})

        if (result) {        
            const resultWithoutPasswordStringified = formatJsonToExcludePasswordAndBigint(result)
        
            const token = jwt.sign(resultWithoutPasswordStringified, process.env.JWT_PASSWORD || "");
            res.status(ResponseStatus.success).json({msg: "Employee Login Successful", success: true, token: `Bearer ${token}`, employee: resultWithoutPasswordStringified });
        } else {
            res.status(ResponseStatus.clientError).json({
                msg: "Incorrect email or password",
                success: false
            });
        }
    } catch (error) {
        console.error(error)
        res.status(ResponseStatus.internalServerError).json({msg: "Internal Server Error", success: false})
    }
}