// app/layout.tsx
import Providers from './providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-..."
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Navbar />
              <Providers>
        <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
