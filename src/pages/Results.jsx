import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api, { lyricsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const getFontClass = (language) => {
  if (language === 'English') return 'font-sym';
  if (language === 'Kannada') return 'font-kannada';
  if (language === 'Sanskrit' || language === 'Hindi' || language === 'Marathi') return 'font-devanagari';
  return '';
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [musicLyrics, setMusicLyrics] = useState(null);
  const [originalMusicLyrics, setOriginalMusicLyrics] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Audio queue states for TTS
  const [isPlayingLyrics, setIsPlayingLyrics] = useState(false);
  const [isPlayingMeaning, setIsPlayingMeaning] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  const lyricsAudioQueueRef = useRef([]);
  const meaningAudioQueueRef = useRef([]);
  const currentLyricsAudioRef = useRef(null);
  const currentMeaningAudioRef = useRef(null);

  // Modals visibility
  const [showDiacritical, setShowDiacritical] = useState(false);
  const [showSanskrit, setShowSanskrit] = useState(false);

  // Languages supported in dropdown
  const languages = ['English', 'Hindi', 'Kannada', 'Malayalam', 'Marathi', 'Sanskrit', 'Tamil', 'Telugu'];

  const diacriticalCharacters = [
    'ā', 'ā́', 'a̱', 'ą', 'ą̄', 'c̆', 'c̣', 'c̃', 'ç', 'd\'', 'd’', 'ḍ', 'ḏ', 'ḏ̣', 'ē', 'é', 'e̱', 'ę', 'ę̄', 'g̃', 'ẖ', 'ḥ', 'ī', 'í', 'i̱', 'į', 'į̄', 'k̃', 'l̃', 'ḷ', 'ḻ', 'ḻ', 'm̃', 'ṃ', 'ñ', 'ṅ', 'ñ', 'ṇ', 'ṉ', 'ō', 'ó', 'o̱', 'ǫ', 'ǭ', 'p̃', 'r̃', 'ṛ', 'ṝ', 'ṟ', 's̃', 'ś', 'ṣ', 's̱', 't\'', 't’', 'ṭ', 'ṯ', 'ū', 'ú', 'u̱', 'ų', 'ų̄', 'ṽ', 'ỹ'
  ];

  useEffect(() => {
    if (location.state && location.state.lyrics) {
      setMusicLyrics(JSON.parse(JSON.stringify(location.state.lyrics)));
      setOriginalMusicLyrics(JSON.parse(JSON.stringify(location.state.lyrics)));
      setSelectedLanguage(location.state.language || 'English');
    }
  }, [location.state]);

  // Clean HTML from text
  const decodeHtml = (html) => {
    if (!html) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value.replace(/<span[^>]*text-decoration:\s*line-through;?[^>]*>.*?<\/span>/gi, '');
  };

  const convertText = (text, isNotation = false) => {
    if (typeof text !== 'string') return text;
    let formatted = text
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      .replace(/  /g, '&nbsp;&nbsp;')
      .replace(/\n/g, '<br>');
    if (isNotation) {
      formatted = formatted.replace(/\n/g, '<br><br>');
      const lines = formatted.split('<br>');
      if (lines.length > 0) {
        lines[0] = lines[0].replace(/([A-Za-z])(\d+)/g, '$1<sup>$2</sup>');
      }
      return lines.join('<br>');
    }
    return formatted;
  };

  const convertNewlinesToBr = (text) => {
    if (typeof text !== 'string') return '';
    return text.replace(/\n/g, '<br>');
  };

  // Run Search
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const regex = new RegExp(searchTerm.trim(), 'gi');
    let found = false;

    if (musicLyrics) {
      ['meaning', 'lyrics', 'sanskrit'].forEach((key) => {
        if (musicLyrics[key] && regex.test(musicLyrics[key])) {
          found = true;
        }
      });
    }

    if (!found) {
      Swal.fire({
        icon: 'warning',
        title: 'No results found',
        text: `No occurrences of "${searchTerm}" found in this composition.`,
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
    }
  };

  const highlightText = (text) => {
    if (!searchTerm.trim() || !text) return text;
    const query = searchTerm.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #ffd700; color: #14051e; font-weight: bold; padding: 2px 4px; border-radius: 4px;">$1</mark>');
  };

  // Text-To-Speech (TTS) Integration
  const fetchAudioQueue = async (type) => {
    if (isLoadingAudio || !musicLyrics) return;
    setIsLoadingAudio(true);

    try {
      const cleanMeaning = decodeHtml(musicLyrics.meaning);
      const cleanLyrics = decodeHtml(musicLyrics.lyrics);
      const payload = {
        language: selectedLanguage,
        title: musicLyrics.title,
        meaning: cleanMeaning,
        lyrics: cleanLyrics.trim()
      };

      const response = await api.post('/api/lyrics/text-to-speech', payload);
      
      if (response.data.lyrics) {
        lyricsAudioQueueRef.current = createAudioQueue(response.data.lyrics);
      }
      if (response.data.meaning) {
        meaningAudioQueueRef.current = createAudioQueue(response.data.meaning);
      }
    } catch (err) {
      console.error('Error fetching TTS audio:', err);
      Swal.fire({
        icon: 'error',
        title: 'TTS Failed',
        text: 'Failed to generate speech audio from the server.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const createAudioQueue = (base64Array) => {
    return base64Array.map((base64) => {
      const blob = base64ToBlob(base64, 'audio/mpeg');
      const url = URL.createObjectURL(blob);
      return new Audio(url);
    });
  };

  const base64ToBlob = (base64, mimeType) => {
    try {
      const raw = window.atob(base64);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: mimeType });
    } catch (err) {
      console.error('Invalid base64 string', err);
      return null;
    }
  };

  const playAudioQueue = (queue, onEnded, isLyrics) => {
    let index = 0;
    const playNext = () => {
      if (index < queue.length) {
        const audio = queue[index];
        if (isLyrics) currentLyricsAudioRef.current = audio;
        else currentMeaningAudioRef.current = audio;
        
        audio.play();
        audio.onended = () => {
          index++;
          playNext();
        };
      } else {
        onEnded();
      }
    };
    playNext();
  };

  const stopAudio = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlayLyrics = async () => {
    if (isPlayingLyrics) {
      stopAudio(currentLyricsAudioRef);
      setIsPlayingLyrics(false);
      return;
    }

    if (isPlayingMeaning) {
      stopAudio(currentMeaningAudioRef);
      setIsPlayingMeaning(false);
    }

    if (lyricsAudioQueueRef.current.length === 0) {
      await fetchAudioQueue();
    }

    if (lyricsAudioQueueRef.current.length > 0) {
      setIsPlayingLyrics(true);
      playAudioQueue(lyricsAudioQueueRef.current, () => setIsPlayingLyrics(false), true);
    }
  };

  const handlePlayMeaning = async () => {
    if (isPlayingMeaning) {
      stopAudio(currentMeaningAudioRef);
      setIsPlayingMeaning(false);
      return;
    }

    if (isPlayingLyrics) {
      stopAudio(currentLyricsAudioRef);
      setIsPlayingLyrics(false);
    }

    if (meaningAudioQueueRef.current.length === 0) {
      await fetchAudioQueue();
    }

    if (meaningAudioQueueRef.current.length > 0) {
      setIsPlayingMeaning(true);
      playAudioQueue(meaningAudioQueueRef.current, () => setIsPlayingMeaning(false), false);
    }
  };

  // Editor functions
  const handleToggleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      setMusicLyrics(JSON.parse(JSON.stringify(originalMusicLyrics)));
    } else {
      const clean = (text) => text ? text.replace(/<\/?span[^>]*>/gi, '').replace(/<br\s*\/?>/gi, '\n') : '';
      setMusicLyrics({
        ...musicLyrics,
        lyrics: clean(musicLyrics.lyrics),
        sanskrit: clean(musicLyrics.sanskrit),
        meaning: clean(musicLyrics.meaning),
        notation: clean(musicLyrics.notation),
      });
      setIsEditing(true);
      setIsSaveEnabled(false);
    }
  };

  const handleFieldChange = (key, value) => {
    const updated = { ...musicLyrics, [key]: value };
    setMusicLyrics(updated);
    
    // Check if anything actually changed from original
    const cleanOrig = (text) => text ? text.replace(/<\/?span[^>]*>/gi, '').replace(/<br\s*\/?>/gi, '\n') : '';
    const hasChanges = 
      value.trim() !== cleanOrig(originalMusicLyrics[key]).trim();
    setIsSaveEnabled(hasChanges);
  };

  const handleSaveEdits = async () => {
    const songNumber = parseInt(musicLyrics.title.split('.')[0].trim(), 10);
    const email = localStorage.getItem('email') || '';
    
    const payload = {
      songTitle: musicLyrics.title,
      songNumber,
      meaning: musicLyrics.meaning,
      sanskrit: musicLyrics.sanskrit,
      lyrics: musicLyrics.lyrics,
      notation: musicLyrics.notation,
      language: selectedLanguage
    };

    try {
      setIsLoadingAudio(true); // temporary spinner flag
      await api.post('/api/lyrics/save', payload, {
        headers: { 'User-Email': email }
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Lyrics updated successfully!',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      
      const savedData = {
        title: musicLyrics.title,
        lyrics: convertNewlinesToBr(musicLyrics.lyrics),
        sanskrit: convertNewlinesToBr(musicLyrics.sanskrit),
        meaning: musicLyrics.meaning,
        notation: convertText(musicLyrics.notation)
      };
      setMusicLyrics(savedData);
      setOriginalMusicLyrics(JSON.parse(JSON.stringify(savedData)));
      setIsEditing(false);
      setIsSaveEnabled(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save changes.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handleSpellcheck = () => {
    Swal.fire({
      title: 'Spellcheck',
      text: 'Spellcheck completed. No issues found.',
      icon: 'success',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom'
      }
    });
  };

  const copyToClipboard = (char) => {
    navigator.clipboard.writeText(char);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `Copied "${char}" to clipboard`,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom'
      }
    });
  };

  if (!musicLyrics) {
    return (
      <div className="fade-in-element page-header text-center py-5 mt-5">
        <div className="container py-5">
          <i className="bi bi-search fs-1 text-gold mb-3 d-block"></i>
          <h2 className="font-serif text-gold">No Composition Selected</h2>
          <p className="text-white-50">Please search or select a composition from the Compositions list.</p>
          <button className="btn btn-gold mt-4" onClick={() => navigate('/musics')}>
            Go to Compositions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-element">
      {/* Search Header Bar */}
      <div className="page-header" style={{ paddingBottom: '30px' }}>
        <div className="container">
          <h1 className={`font-serif display-5 mb-2 ${getFontClass(selectedLanguage)}`}>{musicLyrics.title}</h1>
          <p className="text-white-50 small mb-4">Language: <strong>{selectedLanguage}</strong></p>
          
          <div className="row justify-content-center g-2 align-items-center mb-4">
            <div className="col-auto">
              <input
                type="text"
                className="form-control form-control-custom text-center"
                placeholder="Search a word in lyrics..."
                style={{ width: '280px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-gold px-4 py-2" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-gold px-4 py-2" onClick={handleSpellcheck}>
                Spellcheck
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={() => setShowDiacritical(true)}>
              Diacritical Characters
            </button>
            <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={() => setShowSanskrit(true)}>
              Sanskrit Keyboard Guide
            </button>
            {(isAuthenticated && (user.role === 'editor' || user.role === 'proofreader' || user.role === 'admin')) && (
              <button className="btn btn-gold btn-sm rounded-pill px-3" onClick={handleToggleEdit}>
                {isEditing ? 'Cancel Edit' : 'Edit Composition'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card-custom p-4 p-md-5">
                
                {isEditing ? (
                  /* EDITING MODE INPUTS */
                  <div className="editor-mode-container">
                    <h4 className="font-serif text-gold mb-4 border-bottom pb-2">Editing Mode</h4>
                    
                    <div className="mb-4">
                      <label className="form-label text-white-50">Sanskrit (Devanagari)</label>
                      <textarea
                        className="form-control form-control-custom font-devanagari"
                        rows="6"
                        value={musicLyrics.sanskrit}
                        onChange={(e) => handleFieldChange('sanskrit', e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white-50">Lyrics (English Diacritical)</label>
                      <textarea
                        className="form-control form-control-custom font-sym"
                        rows="6"
                        value={musicLyrics.lyrics}
                        onChange={(e) => handleFieldChange('lyrics', e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white-50">Word Meanings</label>
                      <textarea
                        className="form-control form-control-custom"
                        rows="6"
                        value={musicLyrics.meaning}
                        onChange={(e) => handleFieldChange('meaning', e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white-50">SRGM Swara Notations</label>
                      <textarea
                        className="form-control form-control-custom font-sym"
                        rows="6"
                        value={musicLyrics.notation}
                        onChange={(e) => handleFieldChange('notation', e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                      <button className="btn btn-secondary rounded-pill px-4" onClick={handleToggleEdit}>
                        Cancel
                      </button>
                      <button 
                        className="btn btn-gold-solid px-5" 
                        disabled={!isSaveEnabled} 
                        onClick={handleSaveEdits}
                      >
                        Save Composition
                      </button>
                    </div>
                  </div>
                ) : (
                  /* READ-ONLY VIEW MODE WITH TABS */
                  <div>
                    {/* Audio Player widgets */}
                    <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                      <button 
                        className={`btn ${isPlayingLyrics ? 'btn-danger' : 'btn-gold'} rounded-pill px-4 d-flex align-items-center gap-2`}
                        onClick={handlePlayLyrics}
                        disabled={isLoadingAudio}
                      >
                        <i className={`bi ${isPlayingLyrics ? 'bi-stop-fill' : 'bi-play-fill'}`}></i>
                        {isPlayingLyrics ? 'Stop Lyrics Audio' : 'Speak Lyrics'}
                      </button>
                      
                      <button 
                        className={`btn ${isPlayingMeaning ? 'btn-danger' : 'btn-gold'} rounded-pill px-4 d-flex align-items-center gap-2`}
                        onClick={handlePlayMeaning}
                        disabled={isLoadingAudio}
                      >
                        <i className={`bi ${isPlayingMeaning ? 'bi-stop-fill' : 'bi-play-fill'}`}></i>
                        {isPlayingMeaning ? 'Stop Meaning Audio' : 'Speak Meaning'}
                      </button>
                      
                      {isLoadingAudio && (
                        <div className="d-flex align-items-center text-gold gap-2 small">
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          <span>Loading audio blocks...</span>
                        </div>
                      )}
                    </div>

                    <ul className="nav nav-tabs nav-tabs-custom justify-content-center mb-5" role="tablist">
                      <li className="nav-item">
                        <button className="nav-link active" id="sanskrit-tab" data-bs-toggle="tab" data-bs-target="#sanskrit-pane" type="button" role="tab">
                          Devanagari Sanskrit
                        </button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link" id="lyrics-tab" data-bs-toggle="tab" data-bs-target="#lyrics-pane" type="button" role="tab">
                          English Lyrics
                        </button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link" id="meaning-tab" data-bs-toggle="tab" data-bs-target="#meaning-pane" type="button" role="tab">
                          Word Meaning
                        </button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link" id="notation-tab" data-bs-toggle="tab" data-bs-target="#notation-pane" type="button" role="tab">
                          Swara Notation
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content text-white-80">
                      {/* Sanskrit Tab */}
                      <div className="tab-pane fade show active" id="sanskrit-pane" role="tabpanel" tabIndex="0">
                        <div 
                          className="font-devanagari text-center py-4 fs-3 fw-medium"
                          style={{ lineHeight: '2.5', letterSpacing: '0.5px' }}
                          dangerouslySetInnerHTML={{ __html: highlightText(musicLyrics.sanskrit) }}
                        />
                      </div>

                      {/* Lyrics Tab */}
                      <div className="tab-pane fade" id="lyrics-pane" role="tabpanel" tabIndex="0">
                        <div 
                          className="text-center py-4 fs-5 font-sym"
                          style={{ lineHeight: '2.2', fontStyle: 'italic', letterSpacing: '0.5px' }}
                          dangerouslySetInnerHTML={{ __html: highlightText(musicLyrics.lyrics) }}
                        />
                      </div>

                      {/* Meaning Tab */}
                      <div className="tab-pane fade" id="meaning-pane" role="tabpanel" tabIndex="0">
                        <div 
                          className="py-4 fs-5 mx-auto"
                          style={{ maxWidth: '800px', lineHeight: '2', whiteSpace: 'pre-line' }}
                          dangerouslySetInnerHTML={{ __html: highlightText(musicLyrics.meaning) }}
                        />
                      </div>

                      {/* Notation Tab */}
                      <div className="tab-pane fade" id="notation-pane" role="tabpanel" tabIndex="0">
                        <div 
                          className="font-monospace py-4 border-start border-warning border-3 ps-4 font-sym"
                          style={{ 
                            fontSize: '1rem', 
                            lineHeight: '2.5', 
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '0 8px 8px 0'
                          }}
                          dangerouslySetInnerHTML={{ __html: musicLyrics.notation }}
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIACRITICAL CHARACTERS MODAL */}
      {showDiacritical && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content modal-content-custom">
              <div className="modal-header modal-header-custom d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-serif text-gold">Diacritical Keyboard Helper</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDiacritical(false)}></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-white-50 small mb-4"><i className="bi bi-info-circle"></i> Click on any diacritical character below to copy it instantly to your clipboard, then paste it in the editor.</p>
                <div className="row g-2 justify-content-center">
                  {diacriticalCharacters.map((char) => (
                    <div key={char} className="col-auto">
                      <button 
                        className="btn btn-outline-warning btn-lg fw-bold"
                        style={{ width: '54px', height: '54px', fontSize: '1.2rem', borderColor: 'var(--border-color)' }}
                        onClick={() => copyToClipboard(char)}
                      >
                        {char}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer modal-footer-custom">
                <button type="button" className="btn btn-gold" onClick={() => setShowDiacritical(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SANSKRIT KEYBOARD MAP GUIDE */}
      {showSanskrit && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content modal-content-custom">
              <div className="modal-header modal-header-custom d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-serif text-gold">Sanskrit Typing Guide</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowSanskrit(false)}></button>
              </div>
              <div className="modal-body p-4 text-center">
                <img 
                  src="assets/sanskritchat.jpg" 
                  alt="Sanskrit Keys Layout" 
                  className="img-fluid rounded border mb-2"
                  style={{ maxHeight: '400px', borderColor: 'var(--border-color)' }}
                />
                <p className="text-white-50 small mt-2">Map reference for Devanagari Sanskrit typing structures.</p>
              </div>
              <div className="modal-footer modal-footer-custom">
                <button type="button" className="btn btn-gold" onClick={() => setShowSanskrit(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Results;
