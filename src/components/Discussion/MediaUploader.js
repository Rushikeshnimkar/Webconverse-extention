import React, { useRef, useState, useEffect } from 'react';
import { FaImage, FaVideo, FaMusic, FaGift } from 'react-icons/fa';
import { GiphyFetch } from '@giphy/js-fetch-api';

const giphyFetch = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);

function MediaUploader({ onUpload }) {
  const [showGifSearch, setShowGifSearch] = useState(false);
  const [gifSearchTerm, setGifSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (showGifSearch) {
      searchGifs();
    }
  }, [showGifSearch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload({ type: 'file', file });
    }
  };

  const handleOptionClick = (type) => {
    console.log('Option clicked:', type);
    if (type === 'gif') {
      setShowGifSearch(prev => !prev);
    } else {
      fileInputRef.current.accept = type;
      fileInputRef.current.click();
    }
  };

  const searchGifs = async () => {
    console.log('Searching GIFs with term:', gifSearchTerm);
    try {
      const { data } = await giphyFetch.search(gifSearchTerm || 'random', { limit: 10 });
      console.log('GIFs fetched:', data);
      setGifs(data);
    } catch (error) {
      console.error('Error searching GIFs:', error);
    }
  };

  const handleGifSelect = (gif) => {
    console.log('GIF selected:', gif);
    onUpload({
      type: 'gif',
      url: gif.images.original.url,
      previewUrl: gif.images.fixed_height_small.url,
      title: gif.title
    });
    setShowGifSearch(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => handleOptionClick('image/*')}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          title="Upload Image"
        >
          <FaImage size={20} />
        </button>
        <button
          type="button"
          onClick={() => handleOptionClick('video/*')}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          title="Upload Video"
        >
          <FaVideo size={20} />
        </button>
        <button
          type="button"
          onClick={() => handleOptionClick('audio/*')}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          title="Upload Audio"
        >
          <FaMusic size={20} />
        </button>
        <button
          type="button"
          onClick={() => handleOptionClick('gif')}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          title="Select GIF"
        >
          <FaGift size={20} />
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {showGifSearch && (
        <div className="absolute left-0 bottom-full mb-2 bg-white shadow-lg rounded-lg p-2 w-64 z-50">
          <input
            type="text"
            value={gifSearchTerm}
            onChange={(e) => setGifSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchGifs()}
            placeholder="Search GIFs..."
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt={gif.title}
                onClick={() => handleGifSelect(gif)}
                className="cursor-pointer rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaUploader;