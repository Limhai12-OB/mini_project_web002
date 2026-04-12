import headerToken from "../lib/headerToken";

export async function getProduct() {
  const header = await headerToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
      method: "GET",
      headers: header,
      cache: "no-store",
    });

    if (!res.ok) {
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
