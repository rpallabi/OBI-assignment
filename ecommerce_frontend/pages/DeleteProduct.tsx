import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
export default function DeleteProduct() {
  const [products, setProducts] = useState<{ id: number; name: string; price: string; stock: number }[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'danger',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      showToast('Failed to fetch products', 'danger');
    }
  };

  const deleteProduct = async (id: number) => {
    setLoadingId(id);
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      showToast(`Product with ID ${id} deleted.`, 'success');
    } catch (error) {
      showToast('Failed to delete product', 'danger');
    } finally {
      setLoadingId(null);
    }
  };

  const showToast = (message: string, type: 'success' | 'danger') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 1500);
  };

  return (
    <div className="container mt-5">
        <Navbar></Navbar>
      <h2 className="text-center mb-4">Manage Products</h2>
      {products.length === 0 ? (
        <div className="alert alert-warning text-center">No products available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteProduct(product.id)}
                      disabled={loadingId === product.id}
                    >
                      {loadingId === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast align-items-center text-white bg-${toast.type} border-0 ${
            toast.show ? 'show' : 'hide'
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
