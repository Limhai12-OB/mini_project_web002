export async function loginService(req) {
  if (!req?.email || !req?.password) {
    throw new Error("Email and password are required");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_BASE_URL");

  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const url = new URL("auths/login", normalizedBaseUrl).toString();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: req.email,
      password: req.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Invalid email or password");
  }

  const token = data?.payload?.token ?? data?.data?.token ?? data?.token;
  if (!token) {
    throw new Error("Invalid response from server");
  }

  return {
    id: req.email,
    email: req.email,
    name: String(req.email).split("@")[0],
    token,
  };
}
