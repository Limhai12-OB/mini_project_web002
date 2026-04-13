import { getProduct } from "@/service/product.service";
import ShopCardComponent from "../../../components/shop/ShopCardComponent";
import React from "react";
import { div } from "framer-motion/client";

export default async function Page() {
  const fetchProduct = await getProduct();
  return (
    <div className="mx-auto max-w-[1450px]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center mt-16 mb-16">
        {fetchProduct?.map((pro) => (
          <ShopCardComponent key={pro.productId} product={pro} />
        ))}
      </div>
    </div>
  );
}
