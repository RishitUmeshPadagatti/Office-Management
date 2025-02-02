import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import adminRouter from "./router/adminRouter"
import authRouter from "./router/authRouter"
import uploadRouter from "./router/upload"
import generalRouter from "./router/generalRouter"
import testRouter from "./router/testRouter"
import dashboardRouter from "./router/dashboardRouter"
import {adminMiddleware} from "./middleware/adminMiddleware"
import cors from "cors"

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())

app.use(cors());

app.get("/hello",(req: Request, res: Response) => {
    res.send("Hello")
})

app.use("/admin",adminMiddleware, adminRouter)
app.use("/auth", authRouter)
app.use("/upload", uploadRouter)
app.use("/general", generalRouter)
app.use("/test", testRouter)
app.use("/dashboard", dashboardRouter)

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
});