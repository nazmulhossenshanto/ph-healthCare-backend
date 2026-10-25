import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config";
import { prisma } from "./lib/prisma";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



// create user api
app.use('/api/users', userRoutes);
app.use('/api/users', authRoutes)



app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({
    status: "ok",
    message: "Blog post server is running...",
  });
});

export default app;
