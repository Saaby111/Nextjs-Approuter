import AddToCart from "../../component/AddToCart";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface Props {
  params: { id: string };
}

async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default async function ProductDetail({ params }: Props) {
  const { id } = params;
  const product = await fetchProduct(id);
  if (!product) notFound();

  return (
    <div>
      <h1>{product.title}</h1>
      <AddToCart id={product.id} title={product.title} price={product.price} />
    </div>
  );
}