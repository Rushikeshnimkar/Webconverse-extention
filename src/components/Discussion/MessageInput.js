import React, { useState } from 'react';
import { useDiscussion } from '../../contexts/DiscussionContext';
import { useAuth } from '../../contexts/AuthContext';
import MediaUploader from './MediaUploader';

function MessageInput() {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const { addDiscussion } = useDiscussion();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((content.trim() || media) && user) {
      await addDiscussion(content, null, media);
      setContent('');
      setMedia(null);
    }
  };

  const handleMediaUpload = (mediaData) => {
    setMedia(mediaData);
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
        <div className="flex items-center justify-between">
          <MediaUploader onUpload={handleMediaUpload} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
      {media && (
        <div className="mt-2 text-sm text-gray-600">
          {media.type === 'gif'
            ? `GIF selected: ${media.title}`
            : `File selected: ${media.file.name}`}
        </div>
      )}
    </form>
  );
}

export default MessageInput;