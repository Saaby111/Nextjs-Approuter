"use client";

import { useCart } from "../cart/cart-context";
import "./AddToCart";

export default function AddToCart({
  id,
  title,
  price,
}: {
  id: number;
  title: string;
  price: number;
}) {
  const { actions } = useCart();

  return (
    <button
      className="btn-add-to-cart"
      onClick={() => actions.add({ id, title, price })}
    >
      Add to Cart
    </button>
  );
}