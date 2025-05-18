import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(setProducts);
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
      // Product exists, increase quantity
      updatedCart[existingIndex].quantity += 1;
    } else {
      // Product not in cart, add it
      updatedCart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <>
    <Navbar></Navbar>
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
    </>
  )
}
