import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const getCartValue = (): any[] => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  };

  const addToCart = (product: any) => {
    const currentCart = getCartValue();
    let updatedCart = [...currentCart];

    const existingIndex = updatedCart.findIndex(item => item.product.id === product.id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <h2>Products</h2>
      <div className="row">
        {products.map((p: any) => (
          <div key={p.id} className="col-md-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">Price: ₹{p.price}</p>
                <p className="card-text">Stock: {p.stock}</p>
                <button className="btn btn-primary" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Toast */}
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast align-items-center text-white bg-success border-0 ${showToast ? 'show' : 'hide'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              Product added to cart!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
