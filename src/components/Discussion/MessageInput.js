import React, { useState } from 'react';
import { useDiscussion } from '../../contexts/DiscussionContext';
import { useAuth } from '../../contexts/AuthContext';
import MediaUploader from './MediaUploader';

function MessageInput() {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const { addDiscussion } = useDiscussion();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((content.trim() || mediaFile) && user) {
      await addDiscussion(content, null, mediaFile);
      setContent('');
      setMediaFile(null);
    }
  };

  const handleMediaUpload = (file) => {
    setMediaFile(file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 border-t border-gray-200">
      <div className="flex flex-col space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
        <MediaUploader onUpload={handleMediaUpload} />
        {mediaFile && <p>File selected: {mediaFile.name}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 self-end"
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default MessageInput;