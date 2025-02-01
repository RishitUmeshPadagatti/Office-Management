import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { ResponseStatus } from "../utils/values";
import { formatJsonToExcludePasswordAndBigint } from "../utils/functions";

const prisma = new PrismaClient()

export const searchAllEmployees = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;

        const employees = await prisma.employee.findMany({
            where: {
                name: {
                    contains: String(name),
                    mode: "insensitive",
                }
            },
            take: 4,
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                objectUrl: true,
                role: {
                    select: {
                        name: true
                    }
                },
                office: {
                    select: {
                        name: true
                    }
                }
            },
        });

        res.status(ResponseStatus.success).json({msg: "Take bhai", success: true, employees: formatJsonToExcludePasswordAndBigint(employees) })
    } catch (error) {
        console.error("Error searching employees:", error);
        res.status(ResponseStatus.internalServerError).json({ error: "Internal server error", success: false });
    }
}