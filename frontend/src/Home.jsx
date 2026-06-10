import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import axios from "axios";
export default function Home() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const url = import.meta.env.VITE_API_URL;
  const baseUrl = url.replace("/api", "");

  useEffect(() => {
    axios
      .get(`${url}/products/get`)
      .then((res) => {
        setProducts(res.data.products);
        const initialQty = {};
        res.data.products.forEach((p) => (initialQty[p._id] = 0));
        setQuantities(initialQty);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 0;
    if (qty === 0) {
      alert("Please select at least 1 item");
      return;
    }
    const cartItem = { ...product, qty };
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item,
        ),
      );
    } else {
      setCart([...cart, cartItem]);
    }
    setQuantities({ ...quantities, [product._id]: 0 });
  };

  const handleQtyChange = (productId, change) => {
    setQuantities({
      ...quantities,
      [productId]: Math.max(0, (quantities[productId] || 0) + change),
    });
  };

  return (
    <div className="text-center py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Welcome{user?.name ? `, ${user.name}` : ""}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4 md:p-5">
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              {product.image ? (
                <img
                  src={`${baseUrl}/uploads/${product.image}`}
                  alt={product.name}
                  width="280"
                  height="220"
                  className="object-cover rounded w-full h-40 sm:h-48 md:h-56"
                />
              ) : (
                <div className="w-full h-40 sm:h-48 md:h-56 bg-gray-200 rounded flex items-center justify-center">
                  No Image
                </div>
              )}
              <p className="font-bold text-base sm:text-lg md:text-xl mt-3 line-clamp-2">
                {product.name}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-600 my-2">₹{product.product_price}</p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-2 flex-1">{product.description}</p>
              <div className="mt-auto pt-3 sm:pt-4">
                <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                  <button
                    onClick={() => handleQtyChange(product._id, -1)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 sm:py-2 sm:px-4 rounded shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    −
                  </button>
                  <span className="font-semibold text-base sm:text-lg min-w-8">{quantities[product._id]}</span>
                  <button
                    onClick={() => handleQtyChange(product._id, 1)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 sm:py-2 sm:px-4 rounded shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
