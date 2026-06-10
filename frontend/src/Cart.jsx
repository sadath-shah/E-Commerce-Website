import React, { useContext } from 'react'
import { AppContext } from './App';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  const handleCheckout = () => {
    navigate("/order");
  };

  const handleQtyChange = (productId, change) => {
    setCart(cart.map(item =>
      item._id === productId
        ? { ...item, qty: Math.max(1, item.qty + change) }
        : item
    ));
  };

  const handleRemove = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.product_price * item.qty), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg text-center py-8">Your cart is empty</p>
      ) : (
        <div>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow bg-white"
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
                  <p className="text-orange-600 font-semibold">₹{item.product_price}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQtyChange(item._id, -1)}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded shadow-sm"
                      >
                        −
                      </button>
                      <span className="font-semibold min-w-8 text-center">{item.qty}</span>
                      <button
                        onClick={() => handleQtyChange(item._id, 1)}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded shadow-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-gray-600">
                      Subtotal: <span className="font-bold text-orange-600">₹{item.product_price * item.qty}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border-t-2 border-gray-300 text-right">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Total: <span className="text-orange-600">₹{totalPrice}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
