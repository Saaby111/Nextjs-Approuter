'use client';
import { useCart } from '../cart/cart-context';

export default function CartPage() {
  const { state, actions } = useCart();
  const total = state.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {state.items.map((it) => (
            <li key={it.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{it.title} × {it.quantity}</span>
              <span>${(it.price * it.quantity).toFixed(2)}</span>
              <button className="btn btn-danger btn-sm" onClick={() => actions.remove(it.id)}>
                Remove
              </button>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </li>
        </ul>
      )}
      {state.items.length > 0 && (
        <button className="btn btn-secondary mt-3" onClick={() => actions.clear()}>
          Clear Cart
        </button>
      )}
    </div>
  );
}
