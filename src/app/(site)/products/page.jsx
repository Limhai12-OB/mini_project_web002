import { getProduct } from "@/service/product.service";
import ShopCardComponent from "../../../components/shop/ShopCardComponent";
import React from "react";
import { div } from "framer-motion/client";

export default async function Page() {
  const fetchProduct = await getProduct();
  return (
    <div className="m-auto">
      <div className="flex justify-center">
        {fetchProduct?.map((pro) => (
          <ShopCardComponent key={pro.productId} product={pro} />
        ))}
      </div>
    </div>
  );
}
