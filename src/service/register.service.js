export async function registerService(payload) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL");
  }

  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const endpoint = process.env.NEXT_PUBLIC_REGISTER_ENDPOINT || "auths/register";
  const url = new URL(endpoint, normalizedBaseUrl).toString();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Register failed");
  }

  return data;
}
