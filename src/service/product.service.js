import headerToken from "../lib/headerToken";

export async function getProduct() {
  const header = await headerToken();

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_BASE_URL");
      return [];
    }
    const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const url = new URL("products", normalizedBase).toString();
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

export async function getProductsByCategoryId(categoryId) {
  const header = await headerToken();
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_BASE_URL");
      return [];
    }
    const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const url = new URL(
      `categories/${categoryId}/products`,
      normalizedBase,
    ).toString();
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
    return data?.payload || [];
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
}

export async function getProductById(productId) {
  const header = await headerToken();
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const detailUrl = new URL(
      `products/${productId}`,
      normalizedBase,
    ).toString();
    const detailResponse = await fetch(detailUrl, {
      method: "GET",
      headers: header,
      cache: "no-store",
    });

    if (detailResponse.ok) {
      const detailData = await detailResponse.json();
      return detailData?.payload ?? null;
    }

    const allProducts = await getProduct();
    return allProducts.find(
      (item) => String(item?.productId) === String(productId),
    );
  } catch (err) {
    console.error("Fetch Error: ", err);
    return null;
  }
}
