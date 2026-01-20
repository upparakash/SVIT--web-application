import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const baseURL = 'http://localhost:5000';
  const token = localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching the Users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1 className="users-title">Users</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Profile</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Joined On</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-users">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.profile}
                    alt={user.fullname}
                    className="user-avatar"
                  />
                </td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
