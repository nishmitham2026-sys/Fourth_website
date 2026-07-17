import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter your registered email address.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      return;
    }

    setLoading(true);
    try {
      const msg = await authService.forgotPassword(email);
      Swal.fire({
        icon: 'success',
        title: 'Reset Link Sent',
        text: msg || 'A password reset link has been dispatched to your email address.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      setEmail('');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: err.response?.data?.message || 'Could not dispatch password reset link. Please verify your email.',
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
          <h1 className="font-serif">Forgot Password</h1>
          <p className="text-white-50">Retrieve credentials to access your proofreader or editor dashboard</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)', minHeight: '55vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card-custom p-4 p-md-5">
                <h3 className="font-serif text-gold text-center mb-4">Reset Password</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="emailInput" className="form-label text-white-50 small">Enter Your Email Address</label>
                    <input 
                      type="email" 
                      id="emailInput" 
                      className="form-control form-control-custom text-center"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-gold-solid py-2.5" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending Reset Link...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                  
                  <div className="text-center text-white-50 small">
                    <Link to="/login" style={{ color: 'var(--accent-gold)' }} className="text-decoration-none hover-underline fw-bold">
                      Back to Login
                    </Link>
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

export default ForgotPassword;
