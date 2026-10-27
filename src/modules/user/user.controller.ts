import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import catchAsync from "../../utills/catchAsync";
import { sendResponse } from "../../utills/sendResponse"; 

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
   const profile = await userService.getMyProfileFromDB(req.user?.id as string);
   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: "My Profile retrive successfully!",
     data: {
       profile,
     },
   });
  
  
});

const updateMyProfile = catchAsync(async(req: Request , res: Response, next: NextFunction)=>{
  const userId = req.user?.id as string;
  const payload = req.body
  const updateResult = await userService.updateMyProfileIntoDB(userId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Profile updated successfully!",
    data: {
      updateResult,
    },
  });

})

export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile
};
