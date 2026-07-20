import React, { useState, useRef } from 'react';

const Recordings = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

  const albums = [
    {
      name: 'Sri TK Govinda Rao',
      thumbnail: 'assets/TKG.jpg',
      path: 'assets/TKG/',
      fileType: 'MP3',
      songs: [
        'TKGc004_08_Harichitta Satya_Jonpuri',
        'TKGc006_07_Vekatachalanilayam_sindhubhairavi',
        'TKGc034_05_Harismarane_Yamunakalyani',
        'TKGc049_07_Sri Kanta_Darbari',
        'TKGc147_05b_Vaidya Banda Nodi_Mohanam',
        'TKGc179_08_Adahodalle_Ragamalika',
        'TKGc308_08_Elu Narayana Belagaitu_Bhauli',
        'TKGml165_06_Antakana Dutarike_Ragamalika'
      ],
      description: 'Compilations and performances sung by Sangeetha Kalanidhi late Sri T.K. Govinda Rao.'
    },
    {
      name: 'Dasa Gana Manjari',
      thumbnail: 'assets/Dasa Gana Manjari - Padmaja Kishore_page-0001.jpg',
      path: 'assets/Dasa Gana Manjari/',
      fileType: 'wav',
      songs: [
        '01 venkatAchala nilayam-sindhubhairavi-Adi',
        '02 thallanisadhiru kandya-nartaki-khanDa_cApu',
        '03 bandadhella barali-kApi-Adi',
        '04 lAlisidhalu magana-rAgamAlika-Adi',
        '05 innu daya bAradhe-kalyANa_vasantha-khanDacApu',
        '06 karedare barabArade-rEvati-Adi',
        '07 harichittha satya-jhOnpuri=Adi',
        '08 rOgaharana-bhAgesri-Adi',
        '09 aparAdhi nAnalla-pIlu-misra_cApu',
        '10 indu ninna moreya-misra_pahADi-rUpaka'
      ],
      description: 'Traditional Purandara Dasa compositions rendered by Padmaja Kishore.'
    },
    {
      name: 'Purandara Dasa - Classical',
      thumbnail: 'assets/Compositions of Purandaradasa - Padmaja Kishore_page-0001.jpg',
      path: 'assets/Purandara Dasa - Classical/',
      fileType: 'wav',
      songs: [
        '01 sharanu siddhi vinAyaka-saurAshTra-misra_cApu',
        '02 hanuma bheema madhwa muniya-mOhana-rUpaka',
        '03 srinivAsa neene pAliso-Anandabhairavi-Adi',
        '04 dayamAdo ranga-kalyANI-Adi',
        '05 anthakana dhUtharige-rAgamAlika-khanDa_cApu',
        '06 alli nOdalu rAma-neelAmbari-misra_cApu',
        '07 neene anAthabandhu-nAdanAmakriya-misra_cApu',
        '08 sundara mUruthi-jhenjhOTi-Adi'
      ],
      description: 'Classical rendering of Purandara Dasa devotional keertanas.'
    }
  ];

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setCurrentSongIndex(-1);
    setIsPlaying(false);
  };

  const handleCloseAlbum = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setSelectedAlbum(null);
    setCurrentSongIndex(-1);
    setIsPlaying(false);
  };

  const playSong = (index) => {
    if (!selectedAlbum) return;
    setCurrentSongIndex(index);
    setIsPlaying(true);
    
    const songName = selectedAlbum.songs[index];
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isDev ? '' : 'https://www.purandaradasa.org';
    const songUrl = `${baseUrl}/${selectedAlbum.path}${encodeURIComponent(songName)}.${selectedAlbum.fileType}`;
    
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = songUrl;
      audioPlayerRef.current.load();
      audioPlayerRef.current.play().catch(err => {
        console.error('Audio play failed:', err);
      });
    }
  };

  const handlePlayPause = () => {
    if (!audioPlayerRef.current || currentSongIndex === -1) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNextSong = () => {
    if (!selectedAlbum) return;
    if (currentSongIndex < selectedAlbum.songs.length - 1) {
      playSong(currentSongIndex + 1);
    } else {
      // Loop or stop
      setIsPlaying(false);
      setCurrentSongIndex(-1);
    }
  };

  const formatSongTitle = (title) => {
    // Remove numbers and format file name cleanly
    let clean = title.replace(/^\d+\s+/, '').replace(/_/g, ' ');
    // Upper case words
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Audio Recordings</h1>
          <p className="text-white-50">Archive of classical rendering compositions of Saint Purandara Dasa</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {albums.map((album, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div 
                  className="card-custom h-100 d-flex flex-column justify-content-between cursor-pointer"
                  onClick={() => handleAlbumClick(album)}
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <div className="overflow-hidden" style={{ height: '350px' }}>
                      <img 
                        src={album.thumbnail} 
                        alt={album.name} 
                        className="w-100 h-100 object-fit-cover hover-scale"
                        style={{ transition: 'all 0.4s ease' }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif fs-5 mb-2">{album.name}</h4>
                      <p className="small text-white-50 mb-0">{album.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-0">
                    <button className="btn btn-gold w-100 rounded-pill">
                      <i className="bi bi-disc-fill me-2"></i> View Album Tracks ({album.songs.length})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Album Tracks & Player Modal */}
      {selectedAlbum && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(10, 3, 15, 0.85)' }}
          onClick={handleCloseAlbum}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content modal-content-custom">
              <div className="modal-header modal-header-custom d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-serif text-gold">{selectedAlbum.name} - Tracklist</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseAlbum}></button>
              </div>
              <div className="modal-body p-4 bg-dark" style={{ backgroundColor: '#0d0413 !important' }}>
                <div className="row g-4">
                  {/* Left Column: Cover & Player */}
                  <div className="col-md-5 text-center">
                    <img 
                      src={selectedAlbum.thumbnail} 
                      alt={selectedAlbum.name} 
                      className="img-fluid rounded shadow-lg border mb-4"
                      style={{ maxHeight: '240px', objectFit: 'cover', borderColor: 'var(--border-color)' }}
                    />
                    
                    {/* Stylized Player Widget */}
                    <div className="p-3 rounded-4 border" style={{ backgroundColor: 'var(--surface-bg)', borderColor: 'var(--border-color)' }}>
                      <h6 className="text-gold font-serif text-truncate mb-2">
                        {currentSongIndex !== -1 ? formatSongTitle(selectedAlbum.songs[currentSongIndex]) : 'Select a track to play'}
                      </h6>
                      
                      <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                        <button 
                          className="btn btn-link text-white-50 hover-gold p-0" 
                          onClick={() => {
                            if (currentSongIndex > 0) playSong(currentSongIndex - 1);
                          }}
                          disabled={currentSongIndex <= 0}
                        >
                          <i className="bi bi-skip-start-fill fs-3"></i>
                        </button>
                        <button 
                          className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '48px', height: '48px', backgroundColor: 'var(--accent-gold)', border: 'none' }}
                          onClick={handlePlayPause}
                          disabled={currentSongIndex === -1}
                        >
                          <i className={`bi ${isPlaying ? 'bi-pause-fill text-dark' : 'bi-play-fill text-dark'} fs-3`}></i>
                        </button>
                        <button 
                          className="btn btn-link text-white-50 hover-gold p-0"
                          onClick={() => {
                            if (currentSongIndex < selectedAlbum.songs.length - 1) playSong(currentSongIndex + 1);
                          }}
                          disabled={currentSongIndex === -1 || currentSongIndex >= selectedAlbum.songs.length - 1}
                        >
                          <i className="bi bi-skip-end-fill fs-3"></i>
                        </button>
                      </div>

                      {/* Native Hidden Audio control */}
                      <audio 
                        ref={audioPlayerRef} 
                        className="w-100" 
                        controls
                        onEnded={playNextSong}
                        style={{ display: 'block', margin: '0 auto', filter: 'invert(1) hue-rotate(180deg)' }}
                      />
                    </div>
                  </div>

                  {/* Right Column: Songs List */}
                  <div className="col-md-7">
                    <div className="pe-2" style={{ maxHeight: '380px', overflowY: 'auto' }}>
                      <div className="list-group gap-2">
                        {selectedAlbum.songs.map((song, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`list-group-item list-group-item-action text-white border border-0 d-flex justify-content-between align-items-center rounded-3 p-3 ${currentSongIndex === idx ? 'bg-warning text-dark fw-bold' : 'bg-surface'}`}
                            style={{ 
                              backgroundColor: currentSongIndex === idx ? 'var(--accent-gold)' : 'var(--surface-bg)',
                              transition: 'all 0.2s' 
                            }}
                            onClick={() => playSong(idx)}
                          >
                            <span className="d-flex align-items-center gap-2">
                              <span className={currentSongIndex === idx ? 'text-dark' : 'text-white-50 small'}>{idx + 1}.</span>
                              <span className="text-truncate" style={{ maxWidth: '280px' }}>{formatSongTitle(song)}</span>
                            </span>
                            
                            {currentSongIndex === idx && isPlaying ? (
                              <span className="spinner-grow spinner-grow-sm text-dark" role="status"></span>
                            ) : (
                              <i className={`bi bi-play-fill ${currentSongIndex === idx ? 'text-dark' : 'text-gold'}`} style={{ color: 'var(--accent-gold)' }}></i>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer modal-footer-custom">
                <button type="button" className="btn btn-gold" onClick={handleCloseAlbum}>Close Player</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recordings;
