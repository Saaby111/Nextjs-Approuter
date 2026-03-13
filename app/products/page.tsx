'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error(`API responded with ${res.status}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error('API returned non-array data');
        }
        setProducts(data);
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-muted">No products available right now.</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={p.image}
                  className="card-img-top p-3"
                  alt={p.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text text-success">${p.price.toFixed(2)}</p>
                  <Link href={`/products/${p.id}`} className="btn btn-primary mt-auto">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}