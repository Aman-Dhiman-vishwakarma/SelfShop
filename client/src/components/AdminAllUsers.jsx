import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/user/getallusers"); // Replace with your API
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async (userId, isAdmin) => {
    try {
      const res = await axios.put(`/api/user/updateadminuser/${userId}`, { isAdmin: !isAdmin });
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, isAdmin: !isAdmin } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-28">
        <span className="loading loading-spinner text-secondary loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border">{user.fullname}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => toggleAdmin(user._id, user.isAdmin)}
                  className={`px-4 py-1 rounded text-white ${
                    user.isAdmin ? "bg-red-600" : "bg-green-700"
                  }`}
                >
                  {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
