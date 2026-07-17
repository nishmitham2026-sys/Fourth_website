import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-5 bg-dark border-top" style={{ borderTop: '1px solid var(--border-color) !important', backgroundColor: 'var(--secondary-bg) !important' }}>
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-md-5">
            <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '1px' }}>Sri Purandara Dasa</h5>
            <p className="text-white-50 small pe-md-5">
              Dedicated to preserving, teaching, and sharing the legacy and musical compositions of Sri Purandara Dasa (1484–1564), 
              the founding proponent of Carnatic music. Compositions compiled and edited by the late Sangeetha Kalanidhi Sri T.K. Govinda Rao.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white-50 hover-gold" style={{ transition: 'color 0.2s' }}>
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white-50 hover-gold" style={{ transition: 'color 0.2s' }}>
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white-50 hover-gold" style={{ transition: 'color 0.2s' }}>
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white-50 hover-gold" style={{ transition: 'color 0.2s' }}>
                <i className="bi bi-youtube fs-5"></i>
              </a>
              <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer" className="text-white-50 hover-gold" style={{ transition: 'color 0.2s' }}>
                <i className="bi bi-spotify fs-5"></i>
              </a>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '1px' }}>Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-white-50 text-decoration-none hover-gold">Home</Link></li>
              <li><Link to="/history" className="text-white-50 text-decoration-none hover-gold">Life History</Link></li>
              <li><Link to="/musics" className="text-white-50 text-decoration-none hover-gold">Compositions</Link></li>
              <li><Link to="/articles" className="text-white-50 text-decoration-none hover-gold">Articles</Link></li>
              <li><Link to="/gallary" className="text-white-50 text-decoration-none hover-gold">Gallery</Link></li>
              <li><Link to="/video" className="text-white-50 text-decoration-none hover-gold">Audios/Videos</Link></li>
              <li><Link to="/recordings" className="text-white-50 text-decoration-none hover-gold">Recordings</Link></li>
            </ul>
          </div>
          
          <div className="col-6 col-md-3">
            <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '1px' }}>Get in Touch</h5>
            <p className="text-white-50 small mb-2">
              For proofreading edits, contributions, or general questions, reach out to us:
            </p>
            <a href="mailto:info.tkgovindarao@gmail.com" className="text-decoration-none d-flex align-items-center gap-2 text-gold font-serif fw-bold" style={{ color: 'var(--accent-gold)' }}>
              <i className="bi bi-envelope-fill"></i> info.tkgovindarao@gmail.com
            </a>
            <div className="mt-4 pt-2">
              <a href="https://www.tkgovindarao.org" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-pill px-3 py-1 font-serif small">
                T.K. Govinda Rao Org
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" style={{ opacity: 0.15 }} />
        
        <div className="row align-items-center justify-content-between g-2">
          <div className="col-md-8 text-center text-md-start">
            <p className="text-white-50 small mb-0">
              &copy; {new Date().getFullYear()} GanaMandir / Purandara Dasa. All compositions compiled and edited by late Sangeetha Kalanidhi Sri T.K. Govinda Rao.
            </p>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="text-white-50 small mb-0">
              Redesigned with <i className="bi bi-heart-fill text-danger"></i> for Carnatic Heritage.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
