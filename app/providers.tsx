// app/providers.tsx
'use client';

import { CartProvider } from './cart/cart-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
