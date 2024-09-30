import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function RoleManager() {
  const [users, setUsers] = useState([]);
  const { user, changeRole } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(['users'], (result) => {
      setUsers(result.users || []);
    });
  }, []);

  const handleRoleChange = async (email, newRole) => {
    try {
      await changeRole(email, newRole);
      setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
    } catch (error) {
      alert(error.message);
    }
  };

  if (user.role !== 'global_admin') {
    return <p>You don't have permission to manage roles.</p>;
  }

  return (
    <div className="role-manager">
      <h2>Role Manager</h2>
      <ul>
        {users.map(u => (
          <li key={u.email}>
            {u.email} - 
            <select 
              value={u.role} 
              onChange={(e) => handleRoleChange(u.email, e.target.value)}
            >
              <option value="user">User</option>
              <option value="channel_admin">Channel Admin</option>
              <option value="global_admin">Global Admin</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoleManager;