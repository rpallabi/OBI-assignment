import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function History() {
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const cid = Number(parsedUser.id);
      setCustomerId(cid);
      fetchOrders(cid);
    }
  }, []);

  const fetchOrders = (cid: number) => {
    fetch(`http://localhost:3001/orders`)
      .then(res => res.json())
      .then(data => {
        const filteredOrders = data.filter((order: any) => order.customerId === cid);
        setOrders(filteredOrders);
      })
      .catch(err => {
        console.error('Failed to fetch customer orders:', err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="card mb-4 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Order #{order.id}</h5>
              </div>
              <div className="card-body">
                <p><strong>Customer ID:</strong> {order.customerId}</p>
                <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                <h6 className="mt-4">Items:</h6>
                <table className="table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Product ID</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item: any, index: number) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}