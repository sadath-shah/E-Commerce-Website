import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AppContext } from "./App";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const url = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const handleLogin = async () => {
    const res = await axios.post(`${url}/users/login`, { email, password });
    console.log(res.data.user)
    if (res.data.user) {
      setUser(res.data.user);
      Navigate("/");
    } else {
      setMessage("Invalid User");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Login Form</h3>

        {message && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded shadow-md">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all"
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 sm:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors"
            >
              New User Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
