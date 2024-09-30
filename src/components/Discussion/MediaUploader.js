import React, { useRef } from 'react';

function MediaUploader({ onUpload }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*,audio/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-300"
      >
        Attach Media
      </button>
    </div>
  );
}

export default MediaUploader;