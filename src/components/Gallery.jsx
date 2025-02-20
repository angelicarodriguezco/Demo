import React, { useState, useEffect } from "react";
import { getPhotos } from "../services/flickrService";
import "../styles/list-style.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    // Fetch random photos when the component loads
    getPhotos().then((photos) => setPhotos(photos));
  }, []);

  const handleImageClick = (photo) => {
    const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
    setSelectedPhoto({ ...photo, imgUrl });
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="gallery">
      <h1>Flickr Image Browser</h1>
      <div className="image-list">
        {photos.length > 0 ? (
          photos.map((photo) => {
            const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
            return (
              <img
                key={photo.id}
                src={imgUrl}
                alt={photo.title}
                className="image-item"
                onClick={() => handleImageClick(photo)}
              />
            );
          })
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      {selectedPhoto && (
        <div className="modal" style={{ display: "block" }} onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={selectedPhoto.imgUrl} alt={selectedPhoto.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
