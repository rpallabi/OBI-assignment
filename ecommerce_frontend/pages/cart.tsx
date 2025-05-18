import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const user = sessionStorage.getItem('userData');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCustomerId(parsedUser.id);
    }
  }, []);

  const showTemporaryToast = (message: string, type: 'success' | 'danger') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const checkout = async () => {
    const transformedCart = cart.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    try {
      await axios.post('http://localhost:3001/orders', {
        customerId: Number(customerId),
        items: transformedCart,
      });

      showTemporaryToast('Order placed successfully!', 'success');
      localStorage.removeItem('cart');
      setCart([]);
    } catch (error) {
      console.error('Checkout failed:', error);
      showTemporaryToast('Failed to place the order. Please try again.', 'danger');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="alert alert-info text-center">
            Your cart is currently empty.
          </div>
        ) : (
          <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
              {cart.map((item, i) => (
                <div className="col" key={i}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{item.product.name}</h5>
                      <p className="card-text mb-1"><strong>Product ID:</strong> {item.product.id}</p>
                      <p className="card-text mb-1"><strong>Price:</strong> ₹{item.product.price}</p>
                      <p className="card-text mb-1"><strong>Stock Available:</strong> {item.product.stock}</p>
                      <p className="card-text fw-bold text-success">Quantity in Cart: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="btn btn-lg btn-success px-5" onClick={checkout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bootstrap Toast */}
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast align-items-center text-white bg-${toastType} border-0 ${showToast ? 'show' : 'hide'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
