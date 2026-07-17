import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      return;
    }

    setLoading(true);

    // Mock API call to simulate message sending
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. We will get back to you shortly.',
        confirmButtonText: 'Great',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          confirmButton: 'swal2-confirm-custom btn btn-gold-solid px-4'
        },
        buttonsStyling: false
      });
      // Clear Form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Contact Us</h1>
          <p className="text-white-50">Have questions or want to help proofread compositions? Get in touch with us.</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row g-5 justify-content-center">
            
            {/* Contact Details Card */}
            <div className="col-lg-4">
              <div className="card-custom p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="font-serif text-gold mb-4 border-bottom pb-2">Get In Touch</h3>
                  
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="text-gold mt-1">
                      <i className="bi bi-envelope-fill fs-3" style={{ color: 'var(--accent-gold)' }}></i>
                    </div>
                    <div>
                      <h6 className="text-white fw-bold mb-1">Email Address</h6>
                      <a href="mailto:info.tkgovindarao@gmail.com" className="text-gold text-decoration-none hover-underline font-serif fw-bold">
                        info.tkgovindarao@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="text-gold mt-1">
                      <i className="bi bi-music-note-beamed fs-3" style={{ color: 'var(--accent-gold)' }}></i>
                    </div>
                    <div>
                      <h6 className="text-white fw-bold mb-1">Affiliation</h6>
                      <p className="text-white-50 small mb-0">GanaMandir Heritage Archive Foundation</p>
                    </div>
                  </div>
                </div>

                {/* Social Connect links */}
                <div>
                  <h6 className="text-white-50 small text-uppercase mb-3 fw-bold" style={{ letterSpacing: '1px' }}>Connect with us</h6>
                  <div className="d-flex gap-3">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', color: 'var(--accent-gold)', borderColor: 'var(--border-color)' }}>
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', color: 'var(--accent-gold)', borderColor: 'var(--border-color)' }}>
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', color: 'var(--accent-gold)', borderColor: 'var(--border-color)' }}>
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', color: 'var(--accent-gold)', borderColor: 'var(--border-color)' }}>
                      <i className="bi bi-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-6">
              <div className="card-custom p-4 p-md-5">
                <h3 className="font-serif text-gold mb-4 border-bottom pb-2">Send Message</h3>
                
                <form onSubmit={handleFormSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="nameInput" className="form-label text-white-50 small">Your Name <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        id="nameInput" 
                        name="name"
                        className="form-control form-control-custom"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="emailInput" className="form-label text-white-50 small">Email Address <span className="text-danger">*</span></label>
                      <input 
                        type="email" 
                        id="emailInput" 
                        name="email"
                        className="form-control form-control-custom"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="subjectInput" className="form-label text-white-50 small">Subject</label>
                      <input 
                        type="text" 
                        id="subjectInput" 
                        name="subject"
                        className="form-control form-control-custom"
                        placeholder="Proofreading question, compositions inquiry..."
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="messageInput" className="form-label text-white-50 small">Message Details <span className="text-danger">*</span></label>
                      <textarea 
                        id="messageInput" 
                        name="message"
                        rows="5"
                        className="form-control form-control-custom"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12 text-end mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-gold-solid px-5 py-2.5" 
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
