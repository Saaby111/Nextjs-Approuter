'use client';

import Link from 'next/link';
import { useCart } from '../cart/cart-context';
import React from 'react';

export default function Navbar() {
  const { state } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand">Demo Shop</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/products" className="nav-link">Product List</Link>
            <Link href="/cart" className="nav-link">
              Cart {mounted && totalItems > 0 ? `(${totalItems})` : ''}
            </Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/contact" className="nav-link">Contact Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}