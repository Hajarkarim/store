"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { db } from "../../../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);

  const productsCollection = collection(db, "products");

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(productsCollection);
      const productsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          imgs: { previews: [data.image || ""] },  // map Firebase image to ProductItem imgs.previews
          title: data.name || "",
          price: data.price || 0,
          discountedPrice: data.discountedPrice || data.price || 0, // use discountedPrice if exists
          reviews: data.reviews || 0,
          description: data.description || "",
        };
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();

  }, []);

  return (
    <section id="new-arrivals" className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section title */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              This Week’s  
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              New Arrivals
            </h2>
          </div>
         
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {products.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
