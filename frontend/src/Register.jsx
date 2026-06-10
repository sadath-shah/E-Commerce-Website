import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [user, setUser] = useState();
  const url = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const handleRegister = async () => {
    const res = await axios.post(`${url}/users/register`, user);
    Navigate("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Registration Form</h3>

        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Full Name"
            className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all"
          />

          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email Address"
            className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all"
          />

          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 sm:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Register
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
