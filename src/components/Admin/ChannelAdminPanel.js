import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDiscussion } from '../../contexts/DiscussionContext';

function ChannelAdminPanel() {
  const { user } = useAuth();
  const { currentWebsite } = useDiscussion();

  if (!user.adminWebsites.includes(currentWebsite)) {
    return <p>You don't have permission to access this panel for {currentWebsite}.</p>;
  }

  return (
    <div className="channel-admin-panel">
      <h2>Channel Admin Panel for {currentWebsite}</h2>
      {/* Add channel-specific admin features here */}
    </div>
  );
}

export default ChannelAdminPanel;