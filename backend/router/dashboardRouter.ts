import express from "express"
import { numberOfEmployees, numberOfOffices } from "../controller/dashboardController"

const dashboardRouter = express.Router()

dashboardRouter.get("/number-of-offices", numberOfOffices)
dashboardRouter.get("/number-of-employees", numberOfEmployees)

export default dashboardRouter