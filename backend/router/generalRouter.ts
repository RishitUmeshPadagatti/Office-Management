import express from "express"
import {allEmployees, searchAllEmployees} from "../controller/generalController"

const generalRouter = express.Router()

generalRouter.get("/search-all-employees", searchAllEmployees)
generalRouter.get("/employees", allEmployees)

export default generalRouter