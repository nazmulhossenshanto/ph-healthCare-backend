import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import catchAsync from "../../utills/catchAsync";
import { sendResponse } from "../../utills/sendResponse";

const registerUser = catchAsync(async (req: Request, res: Response) => {
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
});

export const userController = {
  registerUser,
};
