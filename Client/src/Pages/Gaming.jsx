import React, { useEffect, useState } from "react";
import { api } from "../api";

const Gaming = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api("/products?category=Gaming");
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        Loading gaming laptops...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <h1 className="mb-10 text-4xl font-bold">
        Gaming Laptops
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
            )}

            <div className="p-6">
              <p className="text-sm text-blue-400">
                {product.brand}
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {product.name}
              </h2>

              <p className="mt-3 text-slate-400">
                {product.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ${product.price}
                </span>

                <span className="text-sm text-slate-400">
                  Stock: {product.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gaming;