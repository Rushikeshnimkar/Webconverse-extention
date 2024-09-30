import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import WebsiteAdminManager from './WebsiteAdminManager';

function GlobalAdminPanel() {
  const { user } = useAuth();

  if (user.role !== 'global_admin') {
    return <p>You don't have permission to access this panel.</p>;
  }

  return (
    <div className="global-admin-panel">
      <h2>Global Admin Panel</h2>
      <WebsiteAdminManager />
      {/* Add other global admin features here */}
    </div>
  );
}

export default GlobalAdminPanel;