import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function EditProduct() {
  const [product, setProduct] = useState({});
  const [newImage, setNewImage] = useState(null);
  const url = import.meta.env.VITE_API_URL + "/products";
  const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("name", product.name || "")
    formData.append("product_price", product.product_price || "")
    formData.append("description", product.description || "")
    if (newImage) formData.append("image", newImage)
    await axios.patch(`${url}/update/${productId}`, formData);
    navigate("/admin/products");
  };

  const fetchProduct = async () => {
    const res = await axios.get(`${url}/getProduct/${productId}`);
    setProduct(res.data.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h2>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={product.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price (₹)</label>
          <input
            type="number"
            value={product.product_price || ""}
            onChange={(e) => setProduct({ ...product, product_price: e.target.value })}
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <input
            type="text"
            value={product.description || ""}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            placeholder="Enter product description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
          {product.image && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              <img
                src={`${baseUrl}/uploads/${product.image}`}
                alt="current"
                className="w-32 h-32 object-cover rounded-lg shadow-sm"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm text-sm"
          />
          {newImage && (
            <p className="text-sm text-green-600 mt-2">New image selected: {newImage.name}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all mt-6"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
