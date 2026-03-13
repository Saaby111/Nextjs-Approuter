import AddToCart from "./add-to-cart";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store", // don't cache, always fetch fresh
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound(); // shows the closest not-found page
      }
      throw new Error(`API responded with ${res.status}`);
    }

    product = await res.json();
  } catch (err: any) {
    // Log the error on the server (visible in Vercel logs)
    console.error(`Failed to fetch product ${id}:`, err.message);
    error = err.message;
  }

  // If product is missing essential data, treat as not found
  if (!product || !product.id) {
    notFound();
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">
            ${product.price.toFixed(2)}
          </h4>

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