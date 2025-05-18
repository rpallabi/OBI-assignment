import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
export default function Login() {
  const [customers, setCustomers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:3002/customers')
      .then(res => {
        setCustomers(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch customers:', err);
      });
  }, []);

  const handleLogin = () => {
    if (selectedId) {
      sessionStorage.setItem('user',JSON.stringify(selectedId))
      router.push('/home'); // redirect after login
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className="mb-3">
        <label className="form-label">Select Customer</label>
        <select
          className="form-select"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          <option value="">-- Select a customer --</option>
          {customers.map((cust: any) => (
            <option key={cust.id} value={cust.id}>
              {cust.name} ({cust.email})
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleLogin} disabled={!selectedId}>
        Login
      </button>
      <p className="mt-3">
        Don't have an account? <a href="/create-customer">Register here</a>
      </p>
    </div>
  );
}