export const dynamic = 'force-dynamic';
import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

// Always return a safe array even if fetch fails
async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 }, // revalidate cache every 60s
    });

    // If API did not return a successful response, return empty array
    if (!res.ok) {
      console.error("Products API failed:", res.status);
      return [];
    }

    // Try to parse JSON but safely catch if it fails
    const data = await res.json().catch((err) => {
      console.error("Failed to parse JSON:", err);
      return [];
    });

    // If data is not an array, return empty array
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
                  <p className="card-text text-success">${p.price.toFixed(2)}</p>
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