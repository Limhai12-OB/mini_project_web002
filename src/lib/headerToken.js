import { auth } from "../auth";

export default async function headerToken() {
  const session = await auth();
  const token = session?.user?.token;
  console.log("Token being used:", token ? "Found " : "Not Found ");
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  }
  return header;
}
