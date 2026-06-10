import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
export default function EditUser() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_API_URL + "/users";
  const {userId}  = useParams();
  const Navigate = useNavigate()
  const handleSubmit = async () => {
    if (!userId || userId === "undefined") {
      setError("Invalid user ID. Please go back and try again.")
      return
    }
    try {
      await axios.patch(`${url}/updateUser/${userId}`, user)
      Navigate("/admin")
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  };
  const fetchUser = async () => {
    const res = await axios.get(`${url}/getUser/${userId}`);
    setUser(res.data.user);
  };



  useEffect(() => {
    if (userId && userId !== "undefined") fetchUser();
  }, [userId]);
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit User Profile</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Role</label>
          <input
            type="text"
            value={user.role || ""}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            placeholder="Enter role (admin/user)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all mt-6"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
