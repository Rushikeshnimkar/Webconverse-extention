import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../services/supabase';

function WebsiteAdminManager() {
  const [users, setUsers] = useState([]);
  const [website, setWebsite] = useState('');
  const { user, addWebsiteAdmin, removeWebsiteAdmin } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('users')
        .select('email, admin_websites');
      
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    }

    fetchUsers();
  }, []);
  const handleAddAdmin = async (email) => {
    try {
      await addWebsiteAdmin(email, website);
      setUsers(users.map(u => u.email === email ? { ...u, adminWebsites: [...u.adminWebsites, website] } : u));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveAdmin = async (email) => {
    try {
      await removeWebsiteAdmin(email, website);
      setUsers(users.map(u => u.email === email ? { ...u, adminWebsites: u.adminWebsites.filter(w => w !== website) } : u));
    } catch (error) {
      alert(error.message);
    }
  };

  if (user.role !== 'global_admin') {
    return <p>You don't have permission to manage website admins.</p>;
  }

  return (
    <div className="website-admin-manager">
      <h2>Website Admin Manager</h2>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Enter website URL"
      />
      <ul>
        {users.map(u => (
          <li key={u.email}>
            {u.email} - 
            {u.adminWebsites.includes(website) ? (
              <button onClick={() => handleRemoveAdmin(u.email)}>Remove Admin</button>
            ) : (
              <button onClick={() => handleAddAdmin(u.email)}>Make Admin</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WebsiteAdminManager;