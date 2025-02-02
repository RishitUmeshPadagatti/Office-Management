import { Request, Response } from "express"
import {ResponseStatus} from "../utils/values"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const numberOfOffices = async (req: Request, res: Response) => {
    try {
        const length = (await prisma.office.findMany({})).length

        res.status(ResponseStatus.success).json({msg: "Number of offices", length: length})
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError)
    }
}

export const numberOfEmployees = async (req: Request, res: Response) => {
    try {
        const length = (await prisma.employee.findMany({})).length

        res.status(ResponseStatus.success).json({msg: "Number of employees", length: length})
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError)
    }
}