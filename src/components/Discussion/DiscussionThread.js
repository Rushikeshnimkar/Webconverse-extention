import React from 'react';
import { useDiscussion } from '../../contexts/DiscussionContext';
import Message from './Message';

function DiscussionThread() {
  const { discussions } = useDiscussion();

  return (
    <div className="DiscussionThread p-4 space-y-4">
      {discussions.length === 0 ? (
        <p className="text-gray-500 text-center">No discussions yet. Start the conversation!</p>
      ) : (
        discussions.map((discussion) => (
          <Message key={discussion.id} message={discussion} />
        ))
      )}
    </div>
  );
}

export default DiscussionThread;