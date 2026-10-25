import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utills/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utills/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { accessToken, refreshToken } =
      await authService.loginUserIntoDB(payload);
// save token in cookie
res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 1day
    
})
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "none",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1day
});

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in success fully!",
      data: {
        accessToken,
        refreshToken,
      },
    });
  },
);

export const authController = {
  loginUser,
};
