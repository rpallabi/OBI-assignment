import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState({ name: '', email: '' });
  useEffect(() => {
    const u = sessionStorage.getItem('user');
    if (u) {
      console.log(u);

      try {
        const parsed = JSON.parse(u);
        console.log(parsed);

        if (parsed) {
          getUser(parsed);
        }
      } catch (err) {
        console.error('Failed to parse user from sessionStorage:', err);
      }
    }
  }, []);


  const getUser = (userId: number) => {
    axios.get(`http://localhost:3002/customers/${userId}`)
      .then(res => {
        setUser(res.data);
        sessionStorage.setItem('userData', JSON.stringify(res.data));
      })
      .catch(err => {
        console.error('Failed to fetch customer:', err);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="text-center">
        <h1>Welcome to the E-Commerce App {user.name}</h1>
        <p>Select a section from the navigation bar above.</p>
      </div>
      <div className='row'>
        <div className='col-md-10'></div>
        <div className='col-md-2'> <button type="button" className="btn btn-outline-secondary"><Link href="/addProducts" className="nav-link">Add products</Link></button>
        </div>
      </div><br></br>
      <div className='row'>
        <div className='col-md-10'></div>
        <div className='col-md-2'> <button type="button" className="btn btn-outline-secondary"><Link href="/DeleteProduct" className="nav-link">Delete products</Link></button>
        </div>
      </div>
    </>
  );
}
