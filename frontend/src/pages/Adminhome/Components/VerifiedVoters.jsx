import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VerifiedVoters() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/users');
        const nonAdminUsers = response.data.filter(
          (user) => user.role !== 'admin' && user.isVerified === true
        ); // Exclude admins and get only verified users
        setUsers(nonAdminUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user with confirmation
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this voter? This action cannot be undone.'
    );
    if (confirm) {
      try {
        await axios.delete(`http://localhost:3000/user/delete/${id}`);
        setUsers(users.filter((user) => user._id !== id)); // Remove the deleted user from the state
        alert('User deleted successfully');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold flex-1 text-center">Verified Voters</h2>
        <Link to="/admin_dashboard">
          <button className="mt-8 mb-4 p-3 text-white font-medium rounded bg-blue-500 hover:bg-blue-600">
            Back to Home
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Age</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Mobile</th>
              <th className="px-4 py-2 border-b">Address</th>
              <th className="px-4 py-2 border-b">Pincode</th>
              <th className="px-4 py-2 border-b">Voter ID</th>
              <th className="px-4 py-2 border-b">Aadhar Card Number</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.age}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.mobile}</td>
                <td className="px-4 py-2 border-b">{user.address}</td>
                <td className="px-4 py-2 border-b">{user.pincode}</td>
                <td className="px-4 py-2 border-b">{user.VoterID}</td>
                <td className="px-4 py-2 border-b">{user.aadharCardNumber}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
  );
}

export default VerifiedVoters;
