import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom',
        confirmButton: 'swal2-confirm-custom btn btn-gold-solid px-4',
        cancelButton: 'btn btn-secondary rounded-pill px-4 ms-2'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'swal2-popup-custom',
            title: 'swal2-title-custom'
          }
        });
        navigate('/');
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-glass py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="brand-title fs-4 fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
            Purandara Dasa
          </span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/history">
                Life History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/musics">
                Compositions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/articles">
                Articles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/gallary">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/video">
                Audios/Videos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/recordings">
                Recordings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/contact">
                Contact
              </NavLink>
            </li>

            {/* Role based links */}
            {isAuthenticated && user && (
              <>
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <NavLink className="nav-link nav-link-custom active-admin" to="/admin-dashboard">
                      Admin Panel
                    </NavLink>
                  </li>
                )}
                {user.role === 'proofreader' && (
                  <li className="nav-item">
                    <NavLink className="nav-link nav-link-custom" to="/proofreader-details">
                      Proofreader Details
                    </NavLink>
                  </li>
                )}
                {(user.role === 'editor' || user.role === 'proofreader') && (
                  <li className="nav-item">
                    <NavLink className="nav-link nav-link-custom" to="/edited">
                      Edited Songs
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
            {isAuthenticated && user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white-50 small d-none d-xl-inline">
                  Welcome, <strong className="text-gold" style={{ color: 'var(--accent-gold)' }}>{user.username}</strong>
                </span>
                <button className="btn btn-gold btn-sm py-2 px-4 rounded-pill" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link className="btn btn-gold btn-sm py-2 px-4 rounded-pill" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
