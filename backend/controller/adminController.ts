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

// creates a department
// export const createDepartment = async (req: Request, res: Response) => {
//     try {
//         const { name, officeId, dept_head_id } = req.body;

//         const result = await prisma.department.create({ data: { name: name, officeId: officeId, dept_head_id: dept_head_id } })

//         res.status(ResponseStatus.success).json({ msg: "Department Created Successfully", success: true, department: formatJsonToExcludePasswordAndBigint(result) })
//     } catch (error) {
//         console.error(error);
//         res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
//     }
// }

// TODO
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

// assigns employee to a role
export const employeeToRoleAdd = async (req: Request, res: Response) => {
    try {
        const { id, roleId } = req.body;

        const result = await prisma.employee.update({ where: { id: Number(id) }, data: { roleId: Number(roleId) } })

        res.status(ResponseStatus.success).json({ msg: "Role Added To Employee Successfully", success: true, employee: formatJsonToExcludePasswordAndBigint(result) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

// assigns employee to a department and the corresponding office
// export const employeeToDepartmentAdd = async (req: Request, res: Response) => {
//     try {
//         const { id, departmentId } = req.body;

//         const officeId = Number((await prisma.department.findFirst({ where: { id: departmentId } }))?.officeId)

//         const result = await prisma.employee.update({ where: { id: Number(id) }, data: { departmentId: Number(departmentId), officeId: officeId } })

//         res.status(ResponseStatus.success).json({ msg: "Employee Added To Department And Its Office Successfully", success: true, employee: formatJsonToExcludePasswordAndBigint(result) })
//     } catch (error) {
//         console.error(error);
//         res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
//     }
// }

// assigns employee to the office
export const employeeToOfficeAdd = async (req: Request, res: Response) => {
    try {
        const { id, officeId } = req.body;

        const result = await prisma.employee.update({ where: { id: Number(id) }, data: { officeId: Number(officeId) } })

        res.status(ResponseStatus.success).json({ msg: "Employee Added To Office Successfully", success: true, employee: formatJsonToExcludePasswordAndBigint(result) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

// removes employee from the role
export const employeeRoleRemove = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const result = await prisma.employee.update({ where: { id: Number(id) }, data: { roleId: null } })

        res.status(ResponseStatus.success).json({ msg: "Role Removed From Employee Successfully", success: true, employee: formatJsonToExcludePasswordAndBigint(result) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

// removes the employee from the department and removes them from the head department position
// export const employeeDepartmentRemove = async (req: Request, res: Response) => {
//     try {
//         const { id, departmentId } = req.body;

//         await prisma.employee.update({ where: { id: Number(id) }, data: { departmentId: null } })

//         const dept_head_id = Number((await prisma.department.findUnique({ where: { id: departmentId } }))?.dept_head_id)

//         if (id === dept_head_id) {
//             await prisma.department.update({ where: { id: departmentId }, data: { dept_head_id: null } });
//         }

//         res.status(ResponseStatus.success).json({ msg: "Employee Removed From Department Successfully", success: true })
//     } catch (error) {
//         console.error(error);
//         res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
//     }
// }

// removes employee from office and the employee's department
export const employeeOfficeRemove = async (req: Request, res: Response) => {
    try {
        const { id, officeId } = req.body;

        const office = await prisma.office.findUnique({ where: { id: officeId } });
        const regionalManagerId = Number(office?.regional_manager_id);
        const asstRegionalManagerId = Number(office?.asst_regional_manager_id);

        if (regionalManagerId === id) {
            await prisma.office.update({ where: { id: officeId }, data: { regional_manager_id: null } })
        }
        if (asstRegionalManagerId === id) {
            await prisma.office.update({ where: { id: officeId }, data: { asst_regional_manager_id: null } })
        }

        const result = await prisma.employee.update({ where: { id: Number(id) }, data: { roleId: null, officeId: null, departmentId: null } })

        res.status(ResponseStatus.success).json({ msg: "Employee Removed From Office and Department Successfully", success: true, employee: formatJsonToExcludePasswordAndBigint(result) })
    } catch (error) {
        console.error(error);
        res.status(ResponseStatus.internalServerError).json({ msg: "Internal Server Error", success: false })
    }
}

// Assigns a id to regional manager of that office and makes them the employee of that office
export const normalEmployeeToRegionalManagerNewOffice = async (req: Request, res: Response) => {
    try {
        const { id, officeId } = req.body;

        await prisma.office.update({where: {id: officeId}, data: {regional_manager_id: id}})

        prisma.employee.update({where: {id: id}, data: {roleId: 1, officeId: officeId}})

        res.status(ResponseStatus.success).json({msg: "Normal employee to regional manager", success: true})
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