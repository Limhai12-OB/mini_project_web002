import headerToken from "@/lib/headerToken";

export async function getAllCategories() {
  const header = await headerToken();
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_BASE_URL");
      return [];
    }
    const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const url = new URL("categories", normalizedBase).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: header,
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data?.payload || [];
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
}

