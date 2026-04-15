import headerToken from "@/lib/headerToken";

export async function getBestSelling() {
  const header = await headerToken();
  if (!header?.Authorization) {
    return [];
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    console.error("Missing NEXT_PUBLIC_BASE_URL");
    return [];
  }
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const url = new URL("products/top-selling", normalizedBase).toString();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: header,
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return [];
      }
      console.error(`Fetch failed with status: ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data.payload || [];
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
}
