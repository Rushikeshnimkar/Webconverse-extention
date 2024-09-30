import React from 'react';

const WALRUS_AGGREGATOR = 'https://aggregator-devnet.walrus.space'; // Replace with your Walrus aggregator URL

function Message({ message }) {
  const avatarUrl = message.user?.avatar_url || `https://robohash.org/${message.user?.email || 'anonymous'}?set=set3`;
  const username = message.user?.username || message.user?.email || 'Anonymous';

  const renderMedia = () => {
    if (!message.media_blob_id) return null;

    const mediaUrl = `${WALRUS_AGGREGATOR}/v1/${message.media_blob_id}`;

    if (message.media_type?.startsWith('image/')) {
      return <img src={mediaUrl} alt={message.media_file_name} className="max-w-full h-auto mt-2 rounded" />;
    } else if (message.media_type?.startsWith('video/')) {
      return <video src={mediaUrl} controls className="max-w-full h-auto mt-2 rounded" />;
    } else if (message.media_type?.startsWith('audio/')) {
      return <audio src={mediaUrl} controls className="mt-2 w-full" />;
    } else if (message.media_file_name) {
      return <a href={mediaUrl} download={message.media_file_name} className="text-blue-500 hover:underline mt-2 block">Download {message.media_file_name}</a>;
    }
  };

  return (
    <div className="Message bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-2">
        <img
          src={avatarUrl}
          alt={username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-bold text-blue-600">{username}</h4>
          <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleString()}</p>
        </div>
      </div>
      {message.parent && (
        <div className="bg-gray-100 p-2 rounded mb-2 text-sm">
          <p className="font-semibold">Replying to:</p>
          <p>{message.parent.content.substring(0, 50)}...</p>
        </div>
      )}
      <p className="text-gray-700">{message.content}</p>
      {renderMedia()}
    </div>
  );
}

export default Message;