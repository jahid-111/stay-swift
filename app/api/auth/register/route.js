import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fname, lname, email, password } = await request.json();

  await dbConnect();

  const hashPassword = await bcryptjs.hash(password, 5);

  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password: hashPassword,
  };
  try {
    await userModel.create(newUser);
    return new NextResponse("User Has been Created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
