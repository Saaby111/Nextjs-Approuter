import AddToCart from "../../products/[id]/add-to-cart";
import { notFound } from "next/navigation";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      // If product not found or API error, trigger 404
      if (res.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    product = await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    // You could also throw a custom error or redirect to an error page
    throw new Error("Failed to load product details. Please try again.");
  }

  // If product is missing expected fields, handle gracefully
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
          />
        </div>

        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4 className="text-success">
            ${product.price?.toFixed(2) ?? "N/A"}
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