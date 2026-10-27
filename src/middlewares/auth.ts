import { NextFunction, Request, Response } from "express"
import catchAsync from "../utills/catchAsync"
import { jwtUtils } from "../utills/jwt"
import config from "../config/config"
import { JwtPayload } from "jsonwebtoken"
import { Role } from "../../generated/prisma/enums"
import { prisma } from "../lib/prisma"

declare global{
    namespace Express{
        interface Request{
            user?: {
                id: string,
                name: string,
                email: string,
                role: Role
            }
        }
    }
}

export const auth = (...requiredRoles: Role[])=>{
    return catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
        const token = req.cookies.accessToken ? req.cookies.accessToken : (req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization.split("")[1] : req.headers.authorization)
        if(!token){
            throw new Error("You are not logged in. Please login and try later.")
        };
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
        
        if(!verifiedToken.data){
            throw new Error(verifiedToken.error)
        };
        const {id, name, email, role} = verifiedToken.data as JwtPayload;
        if(requiredRoles.length && !requiredRoles.includes(role)){
            throw new Error("Forbidden! You do not have permission to access this resource!")
        };

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id,
                name,
                email
            }, 
            omit: {password: true}
        });
        if(user.activeStatus === "BLOCKED"){
            throw new Error("User is blocked! Please contact to the support.")
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        } 

        next()


    })
}