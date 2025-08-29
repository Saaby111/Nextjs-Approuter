'use client';
import { useCart } from '../../cart/cart-context';

export default function AddToCart({ id, title, price }: { id: number; title: string; price: number }) {
  const { actions } = useCart();
  return (
    <button
      onClick={() => actions.add({ id, title, price })}
      style={{
        padding: '10px 16px',
        borderRadius: 8,
        border: '1px solid #ddd',
        cursor: 'pointer',
      }}
    >
      Add to Cart
    </button>
  );
}
