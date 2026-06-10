import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const url = import.meta.env.VITE_API_URL + "/users";
  const handleRegister = async () => {
    const res = await axios.post(`${url}/register`, user);
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/get`);
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userId) => {
    const res = await axios.delete(`${url}/delete/${userId}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Users</h3>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <input
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Full Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />

          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />

          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />

          <input
            type="text"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            placeholder="Role"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />

          <button
            onClick={handleRegister}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-bold text-gray-700">Name</th>
                <th className="text-left px-6 py-3 font-bold text-gray-700">Email</th>
                <th className="text-left px-6 py-3 font-bold text-gray-700">Role</th>
                <th className="text-center px-6 py-3 font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        to={`editUser/${user._id}`}
                        className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
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
