import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './App';
import axios from 'axios';

export default function Orders() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const baseUrl = url.replace("/api", "");

  useEffect(() => {
    if (user?.id) fetchOrders();
  }, [user?.id]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let endpoint;
      if (user?.role === "admin") {
        endpoint = `${url}/orders/all`;
      } else {
        endpoint = `${url}/orders/user/${user.id}`;
      }
      const res = await axios.get(endpoint);
      setOrders(res.data.orders || res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.patch(`${url}/orders/cancel/${orderId}`);
      fetchOrders();
    } catch (error) {
      alert("Error cancelling order: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        {user?.role === "admin" ? "All Orders" : "My Orders"}
      </h2>

      {loading && <p className="text-gray-600 text-lg">Loading...</p>}
      {!loading && orders.length === 0 && (
        <p className="text-gray-600 text-lg text-center py-8">No orders found</p>
      )}

      {orders.map(order => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg p-6 mb-6 shadow-md hover:shadow-lg transition-shadow bg-white"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div className="space-y-2">
              {user?.role === "admin" && order.userId && (
                <>
                  <p>
                    <strong className="text-gray-700">Customer:</strong>{" "}
                    <span className="text-gray-600">{order.userId.name}</span>
                  </p>
                  <p>
                    <strong className="text-gray-700">Email:</strong>{" "}
                    <span className="text-gray-600">{order.userId.email}</span>
                  </p>
                </>
              )}
              <p>
                <strong className="text-gray-700">Order ID:</strong>{" "}
                <span className="text-gray-600 font-mono text-sm">{order._id}</span>
              </p>
              <p>
                <strong className="text-gray-700">Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    order.status === "cancelled"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </p>
              <p>
                <strong className="text-gray-700">Total:</strong>{" "}
                <span className="text-orange-600 font-bold text-lg">
                  ₹{order.totalAmount}
                </span>
              </p>
              <p>
                <strong className="text-gray-700">Date:</strong>{" "}
                <span className="text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            {order.status !== "cancelled" && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
              >
                Cancel Order
              </button>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="font-bold text-gray-800 mb-4">Items:</p>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {item.image && (
                    <img
                      src={`${baseUrl}/uploads/${item.image}`}
                      alt={item.name}
                      width="80"
                      height="80"
                      className="object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">
                      {item.name}
                    </p>
                    <p className="text-gray-600">
                      ₹{item.product_price} × {item.qty} ={" "}
                      <span className="font-bold text-orange-600">
                        ₹{item.product_price * item.qty}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
