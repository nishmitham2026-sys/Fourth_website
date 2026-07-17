import React, { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: 'assets/img1.jpg', alt: 'Purandara Dasa Pillar Painting' },
    { src: 'assets/img2.jpg', alt: 'Saint Purandara Dasa Classical Sketch' },
    { src: 'assets/purandaradasa1.jpg', alt: 'Purandara Dasa Statue Mandapa' },
    { src: 'assets/purandaradasa3.jpg', alt: 'Purandara Dasa Traditional Portrait' }
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = images.length - 1;
    if (nextIndex >= images.length) nextIndex = 0;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Gallery</h1>
          <p className="text-white-50">Visual archives, monuments, and paintings of Saint Purandara Dasa</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {images.map((img, idx) => (
              <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                <div 
                  className="card-custom h-100 cursor-pointer"
                  onClick={() => openLightbox(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="overflow-hidden" style={{ height: '240px' }}>
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-100 h-100 object-fit-cover hover-scale"
                      style={{ transition: 'all 0.4s ease' }}
                    />
                  </div>
                  <div className="p-3 text-center" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                    <p className="small text-white-50 mb-0 font-serif" style={{ letterSpacing: '0.5px' }}>{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(10, 3, 15, 0.95)' }}
          onClick={closeLightbox}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inner card */
          >
            <div className="modal-content modal-content-custom border-0 position-relative">
              
              {/* Close Button */}
              <button 
                type="button" 
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3"
                style={{ fontSize: '1.2rem', padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%' }}
                onClick={closeLightbox}
                aria-label="Close"
              />

              <div className="modal-body p-0 d-flex flex-column align-items-center position-relative">
                {/* Navigation Buttons */}
                <button 
                  className="btn btn-link text-gold position-absolute start-0 top-50 translate-middle-y ms-2 z-2"
                  style={{ color: 'var(--accent-gold)' }}
                  onClick={() => navigateImage(-1)}
                >
                  <i className="bi bi-chevron-left fs-1"></i>
                </button>
                
                <button 
                  className="btn btn-link text-gold position-absolute end-0 top-50 translate-middle-y me-2 z-2"
                  style={{ color: 'var(--accent-gold)' }}
                  onClick={() => navigateImage(1)}
                >
                  <i className="bi bi-chevron-right fs-1"></i>
                </button>

                <div className="w-100 bg-black d-flex justify-content-center align-items-center" style={{ minHeight: '300px', maxHeight: '75vh', overflow: 'hidden' }}>
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    className="img-fluid"
                    style={{ maxHeight: '70vh', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
                
                <div className="w-100 p-4 text-center" style={{ backgroundColor: 'var(--secondary-bg)', borderTop: '1px solid var(--border-color)' }}>
                  <h5 className="font-serif text-gold mb-1">{selectedImage.alt}</h5>
                  <p className="text-white-50 small mb-0">Image {currentIndex + 1} of {images.length}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
