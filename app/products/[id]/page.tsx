export const dynamic = 'force-dynamic';
import AddToCart from "../../component/AddToCart";
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
  params: Promise<{ id: string }>; // 👈 Type as Promise
}) {
  const { id } = await params; // 👈 Await the Promise

  let product: Product | null = null;

 try {
 const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
  cache: "no-store",
  headers: {
    'User-Agent': 'Next.js App (your-app-name)',
    'Accept': 'application/json',
  },
});

  if (!res.ok) {
    console.error(`API responded with ${res.status} for ID ${id}`);
    if (res.status === 404) notFound();
    throw new Error(`API responded with ${res.status}`);
  }

  product = await res.json();
} catch (err: any) {
  console.error(`Failed to fetch product ${id}:`, err.message, err.stack);
  notFound();
}

  if (!product || !product.id) notFound();

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