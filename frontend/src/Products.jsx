import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const url = import.meta.env.VITE_API_URL + "/products";

  const handleAdd = async () => {
    const formData = new FormData()
    formData.append("name", product?.name || "")
    formData.append("product_price", product?.product_price || "")
    formData.append("description", product?.description || "")
    if (product?.image) formData.append("image", product.image)
    await axios.post(`${url}/create`, formData)
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/get`);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`${url}/delete/${productId}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Products</h3>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <input
            type="text"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Product Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />

          <input
            type="number"
            onChange={(e) => setProduct({ ...product, product_price: e.target.value })}
            placeholder="Price (₹)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />

          <input
            type="text"
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            placeholder="Description"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm text-sm"
          />

          <button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-bold text-gray-700">Name</th>
                <th className="text-left px-6 py-3 font-bold text-gray-700">Price</th>
                <th className="text-left px-6 py-3 font-bold text-gray-700">Description</th>
                <th className="text-center px-6 py-3 font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                    <td className="px-6 py-4 text-orange-600 font-bold">₹{product.product_price}</td>
                    <td className="px-6 py-4 text-gray-600 truncate">{product.description}</td>
                    <td className="px-6 py-4 text-center flex gap-2 justify-center">
                      <Link to={`editProduct/${product._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded shadow-md hover:shadow-lg transition-all text-sm">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-md hover:shadow-lg transition-all text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
