
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center p-4 bg-light rounded mb-5">
        <h1 className="display-4 text-primary">Welcome to Shop</h1>
        <p className="lead">Quality products for everyday needs—all in one place.</p>
        <Link href="/products" className="btn btn-success btn-lg">
          Shop Now
        </Link>
      </div>

      <section className="mb-5">
        <h2 className="mb-4">Shop by Category</h2>
        <div className="row">
          {['Electronics', 'Apparel', 'Home'].map((cat) => (
            <div key={cat} className="col-md-4 mb-4">
              <Link href={`/products?category=${cat.toLowerCase()}`} className="text-decoration-none">
                <div className="card bg-dark text-white h-100">
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">{cat}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mb-5">
        <h4>Keep Shopping?</h4>
        <Link href="/products" className="btn btn-primary">
          Explore All Products
        </Link>
      </section>
    </div>
  );
}
