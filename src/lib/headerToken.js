import { auth } from "../auth";

function normalizeApiToken(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (!s) return null;
  if (s.toLowerCase().startsWith("bearer ")) {
    return s.slice(7).trim();
  }
  return s;
}

export default async function headerToken() {
  const session = await auth();
  const token = normalizeApiToken(session?.user?.token);
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  }
  return header;
}
