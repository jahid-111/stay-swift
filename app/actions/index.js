"use server";

import { signIn } from "@/auth";

export async function login(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log("😭😭😭😭😭", response);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
