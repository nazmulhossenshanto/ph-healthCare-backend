import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import catchAsync from "../../utills/catchAsync";

const registerUser = catchAsync( async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userService.registerUserIntoDB(payload);

  res.status(httpStatus.CREATED).send({
    success: true,
    statusCode: httpStatus.CREATED,
    mesage: "User created successfully!",
    data: {
      user,
    },
  });
})

export const userController = {
  registerUser,
};
