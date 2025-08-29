export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: 'no-store' }).then(res => res.json());
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4 className="text-success">${product.price.toFixed(2)}</h4>
          <button className="btn btn-warning">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
