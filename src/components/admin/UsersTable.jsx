"use client";

import { Edit2, Trash2, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/admin/users", {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
        credentials: "include"
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: "include"
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-lg">Manage Users</h3>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Revenue Gen.
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No users found.</td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="artist">Artist</option>
                    <option value="buyer">Collector (Buyer)</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.revenue}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-gray-400 hover:text-purple-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-6 border-t border-gray-100">
        <span className="text-xs font-medium text-gray-500">
          Showing {users.length} users
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1.5 bg-purple-600 border border-purple-600 rounded-lg text-xs font-semibold text-white hover:bg-purple-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
