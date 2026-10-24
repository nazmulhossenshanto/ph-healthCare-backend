import express, { Application } from "express";


const app: Application = express();

app.get('/', async(req, res)=>{
    res.status(200).send({
        status: 'ok',
        message: "Blog post server is running..."
    })
})

export default app;
