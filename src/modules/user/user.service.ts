import config from "../../config/config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

interface IResigterUser {
    name: string, 
    email: string, 
    password : string, 
    profilePhoto?: string
}

const registerUserIntoDB = async(payload: IResigterUser)=>{
    const {name, email, password, profilePhoto} = payload;
    const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
    throw new Error("User with this email already exists!");
  }
  const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds);
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user
}

export const userService = {
    registerUserIntoDB
}