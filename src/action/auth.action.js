"use server";
import { signIn } from "@/auth";

export async function loginAction(data) {
  console.log("data in action: ", data);
  const { email, password } = data;
  console.log("this is email :", email);

  const res = signIn("credentials", {
    email,
    password,
    redirectTo: "/products",
  });
  if (res && res.error) {
    throw new Error("Error");
  }
  console.log("res from server :", res);
  return res;
}
