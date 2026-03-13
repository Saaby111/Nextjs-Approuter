import AddToCart from "../../component/AddToCart"; 
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductPageProps {
  params: { id: string };
}

// Async function to fetch product
async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) return null; // Product not found
      throw new Error(`API responded with ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, (err as Error).message);
    return null;
  }
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { id } = params;

  const product = await fetchProduct(id);
if (!product || !product.id) notFound();

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">${product.price.toFixed(2)}</h4>

          <AddToCart
            id={product.id}
            title={product.title}
            price={product.price}
          />
        </div>
      </div>
    </div>
  );
}