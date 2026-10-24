import express, { Application, Request, Response } from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import config from "./config/config";


const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true
}))
 

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())

app.get('/', async(req : Request, res: Response)=>{
    res.status(200).send({
        status: 'ok',
        message: "Blog post server is running..."
    })
})

export default app;


 