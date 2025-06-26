"use client";

import ContactCard from "@/components/contact-card";
import ProductDetail from "@/components/design-interface";
import { getOrCreateSessionId } from "@/lib/session";
import { useSelectedProduct } from "@/store/product-store";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductPage() {
  const product = useSelectedProduct((p) => p.product);
  if (product === null) {
    redirect("/customer/product/basehouse");
  }
  useEffect(() => {
    const trackInteraction = async () => {
      try {
        const sessionId = await getOrCreateSessionId();
        await axios.post(`${API_URL}/recommendation/interact`, {
          session_id: sessionId,
          product_id: product.id,
          interaction_type: "view",
        });

        console.log("Call complete", {
          session_id: sessionId,
          product_id: product.id,
          interaction_type: "view",
        });
      } catch (error) {
        console.error("Interaction tracking failed", error);
      }
    };

    if (product?.id) {
      trackInteraction();
    }
  }, [product?.id]);
  
  return (
    <div className="w-full mt-12">
      <ProductDetail design={product} />
      <div className="w-full">
        <ContactCard />
      </div>
    </div>
  );
}
