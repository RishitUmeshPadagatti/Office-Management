import express from "express"
import { assignDeskOrCabin, createEmployee, createFloor, createOffice,  getAllEmployees,  listAllOffices, normalEmployeeToAsstRegionalManagerNewOffice, normalEmployeeToRegionalManagerNewOffice } from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.post("/create-employee", createEmployee);
adminRouter.post("/create-office", createOffice);

adminRouter.post("/normal-employee-to-regional-manager", normalEmployeeToRegionalManagerNewOffice)
adminRouter.post("/normal-employee-to-asst-regional-manager", normalEmployeeToAsstRegionalManagerNewOffice)

adminRouter.post("/list-all-offices", listAllOffices)

// adminRouter.post("/floors", createFloor)
// adminRouter.post("/assign", assignDeskOrCabin)
// adminRouter.post("/employees", getAllEmployees)


export default adminRouter