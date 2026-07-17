import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lyricsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const EditedSongs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [editedSongs, setEditedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEditedSongs = async () => {
    setLoading(true);
    try {
      // Fetch either titles or full descriptions
      const data = await lyricsService.getEditedSongsWithDescription();
      setEditedSongs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching edited songs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditedSongs();
  }, []);

  const handleDelete = async (id, title) => {
    Swal.fire({
      title: 'Delete Edited Version',
      text: `Are you sure you want to discard edits for "${title}"? This reverts to the original version.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete Edits',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom',
        confirmButton: 'swal2-confirm-custom btn btn-danger px-4',
        cancelButton: 'btn btn-secondary rounded-pill px-4 ms-2'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await lyricsService.deleteSong(id);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Edited lyrics entry has been discarded.',
            customClass: {
              popup: 'swal2-popup-custom',
              title: 'swal2-title-custom'
            }
          });
          fetchEditedSongs();
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Deletion Failed',
            text: 'Could not remove edited lyrics record.',
            customClass: {
              popup: 'swal2-popup-custom',
              title: 'swal2-title-custom'
            }
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSelectSong = async (songTitle) => {
    setLoading(true);
    try {
      const lang = localStorage.getItem('language') || 'English';
      const lyricsData = await lyricsService.getMusicLyrics(songTitle, lang);
      navigate('/results', {
        state: {
          lyrics: lyricsData,
          songName: songTitle,
          language: lang
        }
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to retrieve composition detail.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Edited Compositions</h1>
          <p className="text-white-50">Review, preview, and moderate composition contributions submitted by proofreaders</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card-custom p-4 p-md-5">
                <h3 className="font-serif text-gold mb-4 border-bottom pb-2">Contributed Edits Log</h3>
                
                {loading ? (
                  <div className="text-center py-5">
                    <span className="spinner-border spinner-border-sm text-gold" role="status"></span>
                  </div>
                ) : editedSongs.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-custom table-striped align-middle">
                      <thead>
                        <tr>
                          <th style={{ width: '80px' }}>S.No.</th>
                          <th>Composition Name</th>
                          <th>Contributor Email</th>
                          {user && user.role !== 'proofreader' && (
                            <th className="text-end" style={{ width: '150px' }}>Delete</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {editedSongs.map((song, idx) => (
                          <tr key={song.id || idx}>
                            <td className="text-white-50 fw-bold">{idx + 1}</td>
                            <td className="fw-bold text-white-80 hover-gold font-sym" style={{ cursor: 'pointer' }} onClick={() => handleSelectSong(song.songTitle || song.title)}>
                              {song.songTitle || song.title}
                            </td>
                            <td className="font-monospace text-white-50">{song.userEmail || song.email || 'N/A'}</td>
                            {user && user.role !== 'proofreader' && (
                              <td className="text-end">
                                <button className="btn btn-danger btn-sm rounded-pill px-3" onClick={() => handleDelete(song.id, song.songTitle || song.title)}>
                                  Discard
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-white-50 py-5">
                    <i className="bi bi-folder-x fs-1 text-gold d-block mb-3"></i>
                    No edited compositions found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditedSongs;
