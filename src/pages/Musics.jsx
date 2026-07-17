import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lyricsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const getFontClass = (language) => {
  if (language === 'English') return 'font-sym';
  if (language === 'Kannada') return 'font-kannada';
  if (language === 'Sanskrit' || language === 'Hindi' || language === 'Marathi') return 'font-devanagari';
  return '';
};

const Musics = () => {
  const { user, isAuthenticated, subscribe, cancelSubscription } = useAuth();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    'English',
    'Hindi',
    'Kannada',
    'Malayalam',
    'Marathi',
    'Sanskrit',
    'Tamil',
    'Telugu'
  ];

  const fetchCompositions = async (lang) => {
    setLoading(true);
    try {
      const data = await lyricsService.getMusicList(lang);
      // Ensure data is an array
      setMusicList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching compositions:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch compositions. Please check your network or visit the backend site to authorize the SSL certificate.',
        icon: 'error',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          confirmButton: 'swal2-confirm-custom btn btn-gold-solid px-4'
        },
        buttonsStyling: false
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompositions(selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSongClick = async (songName) => {
    setLoading(true);
    try {
      const lyricsData = await lyricsService.getMusicLyrics(songName, selectedLanguage);
      navigate('/results', {
        state: {
          lyrics: lyricsData,
          songName,
          language: selectedLanguage
        }
      });
    } catch (err) {
      console.error('Error fetching lyrics:', err);
      Swal.fire({
        title: 'Lyrics Fetch Failed',
        text: 'Could not load lyrics for this composition.',
        icon: 'error',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to purchase a subscription.',
        icon: 'info',
        confirmButtonText: 'Go to Login',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          confirmButton: 'swal2-confirm-custom btn btn-gold-solid px-4'
        },
        buttonsStyling: false
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    try {
      setLoading(true);
      await subscribe(30); // 30 days subscription
      Swal.fire({
        title: 'Subscribed!',
        text: 'You have successfully subscribed for 15/30 days of full access.',
        icon: 'success',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      fetchCompositions(selectedLanguage);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Subscription Failed',
        text: 'There was an error processing your subscription.',
        icon: 'error',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      await cancelSubscription();
      Swal.fire({
        title: 'Canceled',
        text: 'Your subscription has been canceled.',
        icon: 'success',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      fetchCompositions(selectedLanguage);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Cancellation Failed',
        text: 'There was an error canceling your subscription.',
        icon: 'error',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter list by search query
  const filteredMusicList = musicList.filter((song) =>
    song.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">List of Compositions</h1>
          <p className="text-white-50">Explore the archival music collection compiled by Sri T.K. Govinda Rao</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          {/* Subscription Banner */}
          {isAuthenticated && (
            <div className="row justify-content-center mb-5">
              <div className="col-md-8">
                <div 
                  className="card p-4 text-center border"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '16px'
                  }}
                >
                  {user.subscriptionStatus ? (
                    <div>
                      <h4 className="font-serif text-gold mb-3"><i className="bi bi-shield-check me-2"></i> Premium Active Membership</h4>
                      <p className="text-white-50">You have unlimited premium access to search, view meanings, and read swara notations.</p>
                      <button className="btn btn-outline-danger btn-sm rounded-pill px-4" onClick={handleCancelSubscription}>
                        Cancel Subscription
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-serif text-gold mb-3"><i className="bi bi-star-fill me-2"></i> Unlock All Notations & Lyrics</h4>
                      <p className="text-white-50">Get 15 days of full unlimited access to view Devanagari Sanskrit scripts, word-by-word meanings, and SRGM swara notations.</p>
                      <button className="btn btn-gold-solid btn-sm px-4 py-2" onClick={handleSubscribe}>
                        Activate 15-Day Subscription
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="row g-4">
            {/* Filter and selector sidebar */}
            <div className="col-lg-4">
              <div className="card-custom p-4">
                <h4 className="font-serif mb-4 text-gold">Filters</h4>
                
                {/* Language selection */}
                <div className="mb-4">
                  <label htmlFor="languageSelect" className="form-label text-white-50 small mb-2">Select Script/Language</label>
                  <select 
                    id="languageSelect" 
                    className="form-select form-select-custom text-gold fw-bold"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Local search query */}
                <div className="mb-2">
                  <label htmlFor="searchInput" className="form-label text-white-50 small mb-2">Search Compositions</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-white-50" style={{ borderColor: 'var(--border-color)' }}>
                      <i className="bi bi-search"></i>
                    </span>
                    <input 
                      type="text" 
                      id="searchInput" 
                      className="form-control form-control-custom border-start-0"
                      placeholder="e.g. Gajavadana, Venkatachala..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="text-white-50 small mt-4 pt-3 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                  Total visible compositions: <strong>{filteredMusicList.length}</strong>
                </div>
              </div>
            </div>

            {/* List Table */}
            <div className="col-lg-8">
              {loading ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                  <div className="spinner-border text-gold mb-3" style={{ color: 'var(--accent-gold)' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-white-50">Fetching compositions list...</p>
                </div>
              ) : (
                <div className="table-custom-container">
                  <table className="table table-custom">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>S.No.</th>
                        <th>Composition Name</th>
                        <th className="text-end" style={{ width: '100px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMusicList.length > 0 ? (
                        filteredMusicList.map((song, idx) => (
                          <tr key={song} onClick={() => handleSongClick(song)}>
                            <td className="text-white-50 fw-bold">{idx + 1}</td>
                            <td className={`fw-semibold text-white-80 ${getFontClass(selectedLanguage)}`}>{song}</td>
                            <td className="text-end">
                              <span className="text-gold" style={{ color: 'var(--accent-gold)' }}>
                                <i className="bi bi-arrow-right-circle-fill fs-5"></i>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-white-50 py-5">
                            <i className="bi bi-journal-x fs-1 d-block mb-3 text-gold"></i>
                            No compositions found for language "{selectedLanguage}" matching your query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Musics;
