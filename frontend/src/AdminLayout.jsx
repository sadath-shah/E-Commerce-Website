import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './App'
import Footer from './Footer'

export default function AdminLayout() {
  const { user } = useContext(AppContext)
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="bg-orange-500 text-white shadow-lg">
        <div className="flex flex-wrap gap-6 px-6 py-4">
          <Link
            to="/admin"
            className="font-semibold hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors"
          >
            Users
          </Link>
          <Link
            to="/admin/products"
            className="font-semibold hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors"
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="font-semibold hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors"
          >
            Orders
          </Link>
          {user?.id && (
            <Link
              to={`/admin/editUser/${user.id}`}
              className="font-semibold hover:bg-orange-600 px-3 py-2 rounded-lg transition-colors"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </nav>
      <main className="flex-grow p-4 sm:p-6 md:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
