import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import config from "../../config/config";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Invalid password or credentials!");
  };
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role
  } as JwtPayload;
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in
  } as SignOptions);
  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
    expiresIn: config.jwt_refresh_expires_in
  } as SignOptions)
  return {user, accessToken, refreshToken};
};

export const authService = {
  loginUserIntoDB,
};
