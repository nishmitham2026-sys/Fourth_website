import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="fade-in-element">
      {/* Hero Section */}
      <section 
        className="hero-section d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 5, 30, 0.8), rgba(20, 5, 30, 0.85)), url('assets/bc1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '85vh',
          paddingTop: '120px',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-between align-items-center g-5">
            <div className="col-lg-7 text-center text-lg-start">
              <h5 className="text-uppercase fw-bold text-gold mb-3" style={{ letterSpacing: '3px', color: 'var(--accent-gold)' }}>
                Founder of Carnatic Music
              </h5>
              <h1 className="display-3 fw-bold mb-4 font-serif text-white">
                Sri Purandara Dasa
              </h1>
              <p className="lead text-white-50 mb-5 pe-lg-5" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                A legendary composer, singer, and Haridasa philosopher from Karnataka, 
                celebrated as the Pitamaha (grandfather) of Carnatic music. He codified the system 
                of music instruction and composed hundreds of thousands of spiritual keertanas.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/musics" className="btn btn-gold-solid btn-lg px-5 py-3 rounded-pill">
                  Explore Compositions
                </Link>
                <Link to="/history" className="btn btn-gold btn-lg px-5 py-3 rounded-pill">
                  Read Life History
                </Link>
              </div>
            </div>
            
            <div className="col-lg-4 d-flex justify-content-center">
              <div className="card-custom text-center p-3" style={{ maxWidth: '340px', width: '100%', borderRadius: '24px' }}>
                <img 
                  src="assets/purandaradasa3.jpg" 
                  alt="Purandara Dasa portrait" 
                  className="img-fluid rounded-4 mb-3"
                  style={{ width: '100%', height: 'auto', border: '1px solid var(--border-color)', objectFit: 'cover' }}
                />
                <h4 className="font-serif mb-1" style={{ color: 'var(--accent-gold)' }}>Purandara Dasa</h4>
                <p className="font-serif text-white-50 mb-0 fw-bold" style={{ letterSpacing: '2px', fontSize: '1.1rem' }}>
                  1484 &ndash; 1564
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Card Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card-custom p-4 p-md-5">
                <h2 className="text-center font-serif mb-4 text-uppercase">The Architectural Legacy</h2>
                <div className="underline-gold mb-5"></div>
                
                <p className="fs-5 text-white-80 text-justify mb-4" style={{ lineHeight: '1.9', textAlign: 'justify' }}>
                  Sri Purandara Dasa was a renowned composer, singer, and a Haridasa philosopher from present-day Karnataka, India. 
                  A devoted follower of Madhvacharya's Dvaita philosophy, he is widely celebrated as one of the chief architects 
                  of Karnatak (Carnatic) music. Due to his pivotal contributions, he is often called the 
                  <strong> Pitamaha (grandfather) of Karnatak music</strong>. According to legend, he is believed to be the 
                  incarnation of the sage Narada.
                </p>
                
                <p className="fs-5 text-white-80 text-justify mb-5" style={{ lineHeight: '1.9', textAlign: 'justify' }}>
                  It is said that Sri Purandara Dasa composed a staggering 475,000 keertanas (devotional songs), though only about 
                  1,200 compositions have survived to this day. All 1,200+ compositions featured on this website were meticulously 
                  compiled and edited by Sangeetha Kalanidhi late <a href="https://www.tkgovindarao.org" target="_blank" rel="noopener noreferrer" className="text-gold text-decoration-none fw-bold hover-underline">Sri T.K. Govinda Rao</a>. 
                  These compositions were presented in Roman-English diacritical and Devanagari scripts much like his earlier publications 
                  on all the available compositions of 
                  {' '}<a href="https://www.tkgovindarao.org/books/book1.pdf" target="_blank" rel="noopener noreferrer" className="text-gold text-decoration-none hover-underline">Sri Tyagaraja</a>, 
                  {' '}<a href="https://www.tkgovindarao.org/books/mu.pdf" target="_blank" rel="noopener noreferrer" className="text-gold text-decoration-none hover-underline">Sri Muddusvamy Dikshitar</a>, 
                  {' '}<a href="https://www.tkgovindarao.org/books/ss.pdf" target="_blank" rel="noopener noreferrer" className="text-gold text-decoration-none hover-underline">Sri Syama Sastry</a>, and 
                  {' '}<a href="https://www.tkgovindarao.org/books/st.pdf" target="_blank" rel="noopener noreferrer" className="text-gold text-decoration-none hover-underline">Sri Swati Tirunal</a>. 
                  Sri Govinda Rao also provided SRGM notations for each composition, based on the ragas that were prevalent at the time, 
                  as mentioned in one of Purandara Dasa’s compositions. Furthermore, he included SRGM notations for hundreds of compositions 
                  he personally tuned, many of which were popularized by renowned artists such as <strong>Smt. M.L. Vasanthakumari</strong>.
                </p>
                
                <div className="p-4 rounded-4 text-center border" style={{ backgroundColor: 'rgba(212, 175, 55, 0.04)', borderColor: 'var(--border-color)' }}>
                  <h5 className="font-serif text-gold mb-2"><i className="bi bi-info-circle-fill me-2"></i> Note on Multilingual Lyrics</h5>
                  <p className="text-white-50 small mb-0">
                    You can view the lyrics and notations in multiple scripts and formats by navigating to the Compositions list. 
                    Search for specific song keywords or choose from the eight available Indian languages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
