import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter both email and password.',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await loginUser(email, password);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: `Welcome back, ${loggedUser.username}!`,
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom'
        }
      });

      if (loggedUser.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.message || 'Invalid Username or Password!',
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
          <h1 className="font-serif">Login</h1>
          <p className="text-white-50">Log in to edit lyrics, proofread notations, or access admin insights</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)', minHeight: '55vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card-custom p-4 p-md-5">
                <h3 className="font-serif text-gold text-center mb-4">Account Access</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label text-white-50 small">Email Address</label>
                    <input 
                      type="email" 
                      id="emailInput" 
                      className="form-control form-control-custom"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="passwordInput" className="form-label text-white-50 small">Password</label>
                    <input 
                      type="password" 
                      id="passwordInput" 
                      className="form-control form-control-custom"
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-gold-solid py-2.5" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Logging in...
                        </>
                      ) : (
                        'Log In'
                      )}
                    </button>
                  </div>
                  
                  <div className="text-center text-white-50 small">
                    <Link to="/forget-password" style={{ color: 'var(--accent-gold)' }} className="text-decoration-none hover-underline d-block mb-2">
                      Forgot Password?
                    </Link>
                    <span>Don't have an account? </span>
                    <Link to="/signup" style={{ color: 'var(--accent-gold)' }} className="text-decoration-none hover-underline fw-bold">
                      Signup here
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

export default Login;
