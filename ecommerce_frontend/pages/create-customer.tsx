import { useState } from 'react';

export default function CreateCustomer() {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('http://localhost:3002/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Customer created!');
    setForm({ name: '', email: '' });
  };

  return (
    <>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
