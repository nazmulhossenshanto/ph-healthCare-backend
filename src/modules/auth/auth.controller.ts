import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utills/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utills/sendResponse";
import httpStatus from 'http-status'

const loginUser = catchAsync(async(req: Request, res : Response, next: NextFunction)=>{
    const payload = req.body;
    const loginResult = await authService.loginUserIntoDB(payload);
    sendResponse(res, {
        success:true,
        statusCode: httpStatus.OK,
        message: "User logged in success fully!",
        data: {
            loginResult
        }
    })
});

export const authController = {
    loginUser
}