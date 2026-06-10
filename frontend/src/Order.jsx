import React, { useContext, useState } from 'react'
import { AppContext } from './App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const { user, cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");
  const url = import.meta.env.VITE_API_URL;

  const totalPrice = cart.reduce((sum, item) => sum + (item.product_price * item.qty), 0);

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const orderData = {
        userId: user.id,
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          product_price: item.product_price,
          qty: item.qty,
          image: item.image,
        })),
        totalAmount: totalPrice,
      };
      await axios.post(`${url}/orders/create`, orderData);
      alert("Order placed successfully!");
      setCart([]);
      navigate("/");
    } catch (error) {
      alert("Error placing order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Order Summary</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg text-center py-8">Your cart is empty</p>
      ) : (
        <div>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-white hover:shadow-md transition-shadow"
              >
                {item.image && (
                  <img
                    src={`${baseUrl}/uploads/${item.image}`}
                    alt={item.name}
                    width="100"
                    height="100"
                    className="object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <p className="font-bold text-lg text-gray-800">{item.name}</p>
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

          <div className="bg-gray-100 rounded-lg p-6 mb-8 border border-gray-200">
            <p className="text-2xl font-bold text-gray-800">
              Total Amount:{" "}
              <span className="text-orange-600">₹{totalPrice}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
            >
              Back to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
