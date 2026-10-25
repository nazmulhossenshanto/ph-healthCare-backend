import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import catchAsync from "../../utills/catchAsync";
import { sendResponse } from "../../utills/sendResponse";
import { jwtUtils } from "../../utills/jwt";
import config from "../../config/config";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Registered Successfully!",
      data: {
        user,
      },
    });
  },
);

const getMyProfile = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
   
  
  
})

export const userController = {
  registerUser,
  getMyProfile
};
