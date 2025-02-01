import express from "express"
import {loginAdmin, loginEmployee} from "../controller/authController"

const authRouter = express.Router()

authRouter.post("/login-admin", loginAdmin)
authRouter.post("/login-employee", loginEmployee)

export default authRouter