import React, { useState } from 'react';

const Video = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const albums = [
    { 
      albumName: 'Sri TK Govinda Rao', 
      albumThumbnail: 'assets/tkgr3.jpg', 
      playlistId: 'PLtMJjcu3AEUeqq6regZCuviVRRTZe_ZZh',
      description: 'Performances and compilations by the master compiler Sri T.K. Govinda Rao.'
    },
    { 
      albumName: 'Smt MS Subbulakshmi', 
      albumThumbnail: 'assets/mss.jpg', 
      playlistId: 'PLtMJjcu3AEUdwljlLUwTWKN43kestCqEF',
      description: 'Devotional rendering of Purandara Dasa compositions by Carnatic legend Smt M.S. Subbulakshmi.'
    },
    { 
      albumName: 'Smt ML Vasanthakumari', 
      albumThumbnail: 'assets/mlv.jpg', 
      playlistId: 'PLtMJjcu3AEUfUTkgIsg7YtTxGox9qUPUC',
      description: 'Classic archives of Purandara Dasa songs sung by the legendary Smt M.L. Vasanthakumari.'
    },
    { 
      albumName: 'Bombay Sisters', 
      albumThumbnail: 'assets/bs.jpg', 
      playlistId: 'PLtMJjcu3AEUf7L-l2-vMMWnRw3fvHGdl1',
      description: 'Enchanting duets of Purandara Dasa compositions performed by the Bombay Sisters.'
    }
  ];

  const openPlaylist = (playlistId, albumName) => {
    setSelectedPlaylist(playlistId);
    setModalTitle(albumName);
  };

  const closePlaylist = () => {
    setSelectedPlaylist(null);
    setModalTitle('');
  };

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Audios &amp; Videos</h1>
          <p className="text-white-50">Curated YouTube playlist archives of Purandara Dasa musical performances</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {albums.map((album, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div 
                  className="card-custom h-100 d-flex flex-column justify-content-between cursor-pointer"
                  onClick={() => openPlaylist(album.playlistId, album.albumName)}
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <div className="overflow-hidden" style={{ height: '300px' }}>
                      <img 
                        src={album.albumThumbnail} 
                        alt={album.albumName} 
                        className="w-100 h-100 object-fit-cover hover-scale"
                        style={{ transition: 'all 0.4s ease' }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif fs-5 mb-2">{album.albumName}</h4>
                      <p className="small text-white-50 mb-0">{album.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-0 text-center">
                    <button className="btn btn-gold btn-sm w-100 rounded-pill">
                      <i className="bi bi-play-circle-fill me-2"></i> Play Playlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Playlist Embed Modal */}
      {selectedPlaylist && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(10, 3, 15, 0.85)' }}
          onClick={closePlaylist}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content modal-content-custom">
              <div className="modal-header modal-header-custom d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-serif text-gold">{modalTitle} - Playlist</h5>
                <button type="button" className="btn-close btn-close-white" onClick={closePlaylist}></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe 
                    title={modalTitle}
                    src={`https://www.youtube.com/embed/videoseries?list=${selectedPlaylist}&autoplay=1`} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="modal-footer modal-footer-custom">
                <button type="button" className="btn btn-gold" onClick={closePlaylist}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
