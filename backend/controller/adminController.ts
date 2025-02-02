import { Request, Response } from "express"
import { ResponseStatus } from "../utils/values"
import { Employee, Office, PrismaClient } from "@prisma/client";
import { formatJsonToExcludePasswordAndBigint } from "../utils/functions";

const prisma = new PrismaClient();

// create an employee
export const createEmployee = async (req: Request, res: Response) => {
    try {
        const data: Employee = req.body;

        const result = await prisma.employee.create({ data: data })

        res.status(ResponseStatus.success).json({ msg: "Employee Created Successfully", success: true, employee: formatJsonToExcludePasswordAndBigint(result) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

// creates an office
export const createOffice = async (req: Request, res: Response) => {
    try {
        const data: Office = req.body;

        const result = await prisma.office.create({ data: data });

        res.status(ResponseStatus.success).json({ msg: "Office Created Successfully", success: true, office: formatJsonToExcludePasswordAndBigint(result) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

// Assigns a id to regional manager of that office and makes them the employee of that office
export const normalEmployeeToRegionalManagerNewOffice = async (req: Request, res: Response) => {
    try {
        let { employeeId, officeId } = req.body;
        employeeId = Number(employeeId)
        officeId = Number(officeId)

        const employee = await prisma.employee.update({ where: { id: employeeId }, data: { role: "REGIONAL_MANAGER", officeId: officeId } })

        await prisma.office.update({ where: { id: officeId }, data: { regional_manager_id: employeeId } })

        res.status(ResponseStatus.success).json({ msg: "Employee Made Regional Manager", success: true, employee: formatJsonToExcludePasswordAndBigint(employee) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

export const normalEmployeeToAsstRegionalManagerNewOffice = async (req: Request, res: Response) => {
    try {
        let { employeeId, officeId } = req.body;
        employeeId = Number(employeeId)
        officeId = Number(officeId)

        const employee = await prisma.employee.update({ where: { id: employeeId }, data: { role: "ASST_REGIONAL_MANAGER", officeId: officeId } })

        await prisma.office.update({ where: { id: officeId }, data: { asst_regional_manager_id: employeeId } })

        res.status(ResponseStatus.success).json({ msg: "Employee Made Asst Regional Manager", success: true, employee: formatJsonToExcludePasswordAndBigint(employee) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

export const listAllOffices = async (req: Request, res: Response) => {
    try {
        const result = await prisma.office.findMany({})

        res.status(ResponseStatus.success).json({ msg: "Take offices", success: true, offices: result })
    } catch (error) {
        console.error(error)
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}



export const createFloor = async (req: Request, res: Response) => {
    const { name, officeId } = req.body;

    try {
        const floor = await prisma.floor.create({
            data: {
                name,
                officeId,
            },
        });
        // Sending response directly without using return
        res.status(201).json(floor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create floor' });
    }
}

export const assignDeskOrCabin = async (req: Request, res: Response) => {
    const { floorId, employeeId } = req.body;

    try {
        // Find the floor to assign desks or cabins
        const floor = await prisma.floor.findUnique({
            where: { id: floorId },
            include: { desks: true, cabins: true },
        });

        if (!floor) {
            res.status(404).json({ error: 'Floor not found' });
            return;
        }

        // Try assigning to an available desk
        let deskAssigned = false;
        let cabinAssigned = false;

        // Try assigning to an available desk
        for (const desk of floor.desks) {
            if (!desk.occupiedById) {
                await prisma.desk.update({
                    where: { id: desk.id },
                    data: { occupiedById: employeeId },
                });
                deskAssigned = true;
                break;
            }
        }

        // If desk is full, try assigning to a cabin
        if (!deskAssigned) {
            for (const cabin of floor.cabins) {
                if (!cabin.occupiedById) {
                    await prisma.cabin.update({
                        where: { id: cabin.id },
                        data: { occupiedById: employeeId },
                    });
                    cabinAssigned = true;
                    break;
                }
            }
        }

        if (deskAssigned || cabinAssigned) {
            res.status(200).json({ message: 'Employee assigned successfully' });
        } else {
            res.status(400).json({ error: 'No available desks or cabins' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign employee' });
    }
}

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await prisma.employee.findMany();
        res.status(200).json({msg: "Lelo bhai", success: true, employees: formatJsonToExcludePasswordAndBigint(employees)});
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
}