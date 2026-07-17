import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import Swal from 'sweetalert2';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    proofreaderDetails: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please verify.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authService.signup(
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.role,
        formData.role === 'proofreader' ? formData.proofreaderDetails : ''
      );

      Swal.fire({
        icon: 'success',
        title: 'Registration Submitted',
        text: response.message || 'Your signup request has been sent for admin review.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });

      navigate('/approval-pending');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.response?.data?.message || 'Error occurred during registration.',
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
          <h1 className="font-serif">Sign Up</h1>
          <p className="text-white-50">Join as an editor or proofreader to help preserve the Purandara Dasa archives</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)', minHeight: '60vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card-custom p-4 p-md-5">
                <h3 className="font-serif text-gold text-center mb-4">Create Account</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="usernameInput" className="form-label text-white-50 small">Username <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        id="usernameInput" 
                        name="username"
                        className="form-control form-control-custom"
                        placeholder="JohnDoe"
                        value={formData.username}
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

                    <div className="col-md-6">
                      <label htmlFor="passwordInput" className="form-label text-white-50 small">Password <span className="text-danger">*</span></label>
                      <input 
                        type="password" 
                        id="passwordInput" 
                        name="password"
                        className="form-control form-control-custom"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="confirmPasswordInput" className="form-label text-white-50 small">Confirm Password <span className="text-danger">*</span></label>
                      <input 
                        type="password" 
                        id="confirmPasswordInput" 
                        name="confirmPassword"
                        className="form-control form-control-custom"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="roleSelect" className="form-label text-white-50 small">Select Role <span className="text-danger">*</span></label>
                      <select 
                        id="roleSelect" 
                        name="role"
                        className="form-select form-select-custom text-gold"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Choose Account Type --</option>
                        <option value="proofreader">PROOFREADER (Verify lyrics and swaras)</option>
                        <option value="editor">EDITOR (Modify lyrics, swaras, and notations)</option>
                      </select>
                    </div>

                    {formData.role === 'proofreader' && (
                      <div className="col-12">
                        <label htmlFor="proofreaderDetailsInput" className="form-label text-white-50 small">Proofreader Details / Qualifications</label>
                        <textarea 
                          id="proofreaderDetailsInput" 
                          name="proofreaderDetails"
                          rows="4"
                          className="form-control form-control-custom"
                          placeholder="Please mention your musical background, Carnatic experience, or training to expedite registration approval..."
                          value={formData.proofreaderDetails}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    <div className="col-12 d-grid mt-4">
                      <button type="submit" className="btn btn-gold-solid py-2.5" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Submitting Registration...
                          </>
                        ) : (
                          'Sign Up'
                        )}
                      </button>
                    </div>

                    <div className="col-12 text-center text-white-50 small mt-3">
                      <span>Already have an account? </span>
                      <Link to="/login" style={{ color: 'var(--accent-gold)' }} className="text-decoration-none hover-underline fw-bold">
                        Login here
                      </Link>
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

export default Signup;
