export const dynamic = 'force-dynamic';
import React from "react";


interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 }, // cache & revalidate every 60 seconds
    });

    // If API didn’t return 2xx, don’t parse JSON
    if (!res.ok) {
      console.error("Products API failed status:", res.status);
      return []; // fallback to empty list
    }

    // Safely parse JSON
    const data = await res.json().catch((err) => {
      console.error("JSON parse error:", err);
      return [];
    });

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
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
                <p className="card-text text-success">${p.price.toFixed(2)}</p>
                <a href={`/products/${p.id}`} className="btn btn-primary mt-auto">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}