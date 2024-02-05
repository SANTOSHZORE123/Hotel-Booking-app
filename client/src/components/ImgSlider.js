import React, { useState, useEffect } from 'react';

function Slider({ photos }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextPhoto();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPhotoIndex, isHovered]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };
  return (
    <div
      style={{ width: '300px', height: '300px', position: 'relative',cursor:isHovered?"pointer":"initial" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={photos[currentPhotoIndex]}
        alt={`Photo ${currentPhotoIndex + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onClick={nextPhoto}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          cursor: 'pointer',
        }}
        onClick={prevPhoto}
      >
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          cursor: 'pointer',
        }}
        onClick={nextPhoto}
      >
      </div>
    </div>
  );
}

export default Slider;
