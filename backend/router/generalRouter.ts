import express from "express"
import {searchAllEmployees} from "../controller/generalController"

const generalRouter = express.Router()

generalRouter.get("/search-all-employees", searchAllEmployees)

export default generalRouter