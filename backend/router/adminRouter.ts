import express from "express"
import { createEmployee, createOffice, employeeOfficeRemove, employeeRoleRemove, employeeToOfficeAdd, employeeToRoleAdd, listAllOffices, normalEmployeeToRegionalManagerNewOffice } from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.post("/create-employee", createEmployee);
// adminRouter.post("/create-department", createDepartment);
adminRouter.post("/create-office", createOffice);

adminRouter.post("/employee-to-role", employeeToRoleAdd)
// adminRouter.post("/employee-to-department", employeeToDepartmentAdd)
adminRouter.post("/employee-to-office", employeeToOfficeAdd)
adminRouter.post("/employee-role-remove", employeeRoleRemove)
// adminRouter.post("/employee-department-remove", employeeDepartmentRemove)
adminRouter.post("/employee-office-remove", employeeOfficeRemove)

adminRouter.post("/normal-employee-to-regional-manager", normalEmployeeToRegionalManagerNewOffice)

adminRouter.post("/list-all-offices", listAllOffices)


export default adminRouter