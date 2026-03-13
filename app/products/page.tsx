
export default async function ProductsPage() {
  const products = await fetch('https://fakestoreapi.com/products').then(res => res.json());
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {products.map((p: any) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={p.image} className="card-img-top p-3" alt={p.title} style={{ height: '200px', objectFit: 'contain' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-success">${p.price.toFixed(2)}</p>
                <a href={`/products/${p.id}`} className="btn btn-primary mt-auto">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
