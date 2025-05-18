import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/home" className="navbar-brand">E-Commerce</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link href="/products" className="nav-link">Products</Link></li>
            <li className="nav-item"><Link href="/cart" className="nav-link">Cart</Link></li>
            <li className="nav-item"><Link href="/history" className="nav-link">Order History</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
