"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ClientSide = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null); // Error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const parsedResponse: Product[] = await response.json();
        setData(parsedResponse);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  // Loading and error states
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Client Side Rendering Data Fetching - Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
                width={300}
                height={300}
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {product.title}
              </h2>
              <p className="text-gray-500 line-clamp-3">
                {product.description}
              </p>
              <p className="text-gray-700 font-bold mt-2">${product.price}</p>
              <p className="text-gray-500 italic">{product.category}</p>
              <p className="text-gray-500 italic">
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSide;
