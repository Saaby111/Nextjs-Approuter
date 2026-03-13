// This ensures Next.js does not prerender this page at build time
export const dynamic = "force-dynamic";

import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      console.error(`API responded with ${res.status}: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("API returned non-array data:", data);
      return [];
    }
    return data;
  } catch (err: any) {
    console.error("Failed to fetch products:", {
      name: err.name,
      message: err.message,
      cause: err.cause,
    });
    return [];
  }
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-muted">
          No products available right now.
        </p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={p.image}
                  className="card-img-top p-3"
                  alt={p.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text text-success">
                    ${p.price.toFixed(2)}
                  </p>
                  <a
                    href={`/products/${p.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}