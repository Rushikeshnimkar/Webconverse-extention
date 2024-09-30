import React, { useEffect } from 'react';
import { useDiscussion } from '../contexts/DiscussionContext';
import DiscussionThread from '../components/Discussion/DiscussionThread';
import MessageInput from '../components/Discussion/MessageInput';

function Discussion() {
  const { currentWebsite } = useDiscussion();
  useEffect(() => {
    console.log('currentWebsite in Discussion component:', currentWebsite);
  }, [currentWebsite]);

  return (
    <div className="Discussion bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="bg-blue-600 text-white text-xl font-bold py-4 px-6">
          Discussion for {currentWebsite}
        </h2>
        <div className="h-[calc(100vh-250px)] overflow-y-auto">
          <DiscussionThread />
        </div>
        <MessageInput />
      </div>
    </div>
  );
}

export default Discussion;