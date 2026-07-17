import React from 'react';
import { Link } from 'react-router-dom';

const ApprovalPending = () => {
  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Registration Sent</h1>
          <p className="text-white-50">Pending Review</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)', minHeight: '55vh' }}>
        <div className="container text-center py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card-custom p-5">
                <i className="bi bi-clock-history text-gold display-1 mb-4" style={{ color: 'var(--accent-gold)' }}></i>
                <h2 className="font-serif text-gold mb-3">Waiting for Admin Approval</h2>
                <p className="text-white-50 mb-4 fs-5">
                  Thank you for registering! Your application is currently under review by our editorial board. 
                  You will receive a confirmation email once your editor/proofreader access has been authorized.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/" className="btn btn-gold px-4 py-2 rounded-pill">
                    Go to Homepage
                  </Link>
                  <Link to="/login" className="btn btn-gold-solid px-4 py-2 rounded-pill">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApprovalPending;
