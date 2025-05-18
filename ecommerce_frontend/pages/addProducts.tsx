import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        setError('');

        if (!name || !price || !stock) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await axios.post('http://localhost:3001/products', {
                name,
                price: Number(price),
                stock: Number(stock)
            });
            setSuccess(true);
            setName('');
            setPrice('');
            setStock('');
        } catch (err) {
            console.error(err);
            setError('Failed to add product');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4 text-center"> Add New Product</h2>

                {success && (
                    <div className="alert alert-success">Product added successfully!</div>
                )}
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="card shadow p-4">
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter product name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price (₹)</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter available stock"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                            min="0"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Add Product
                    </button>
                </form>
            </div>
        </>
    );
}