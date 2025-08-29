// app/page.tsx
export default function HomePage() {
  return (
    <div className="container mt-5">
      
      <div className="jumbotron text-center p-4 bg-light rounded mb-5">
        <h1 className="display-4 text-primary">Welcome to Shop</h1>
        <p className="lead">Quality products for everyday needs—all in one place.</p>
        <a href="/products" className="btn btn-success btn-lg">
          Shop Now
        </a>
      </div>

      
      <section className="mb-5">
        <h2 className="mb-4">Shop by Category</h2>
        <div className="row">
          {['Electronics', 'Apparel', 'Home'].map((cat) => (
            <div key={cat} className="col-md-4 mb-4">
              <a href="/products" className="text-decoration-none">
                <div className="card bg-dark text-white h-100">
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">{cat}</h5>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

    

      
      <section className="text-center mb-5">
        <h4>Trusted by Customers Worldwide</h4>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <span className="badge bg-secondary me-2">Secure Checkout</span>
          <span className="badge bg-secondary me-2">Highest Quality</span>
          <span className="badge bg-secondary">24/7 Support</span>
        </div>
      </section>


    
      <section className="text-center mb-5">
        <h4>Keep Shopping?</h4>
        <a href="/products" className="btn btn-primary">
          Explore All Products
        </a>
      </section>
    </div>
  );
}
