import { getSession } from "next-auth/react";

export default async function headerToken() {
  const session = await getSession();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.token}`,
  };
}
