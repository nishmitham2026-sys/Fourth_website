import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import Swal from 'sweetalert2';

const ProofreaderDetails = () => {
  const [proofreaders, setProofreaders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProofreaders = async () => {
    setLoading(true);
    try {
      const data = await adminService.getProofreaderDetails();
      setProofreaders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching proofreader details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProofreaders();
  }, []);

  const handleCancelApproval = async (email) => {
    Swal.fire({
      title: 'Deactivate Account',
      text: `Are you sure you want to deactivate and remove proofreader access for ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deactivate',
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
          await adminService.cancelProofreaderApproval(email);
          Swal.fire({
            icon: 'success',
            title: 'Deactivated',
            text: 'Proofreader privileges canceled.',
            customClass: {
              popup: 'swal2-popup-custom',
              title: 'swal2-title-custom'
            }
          });
          fetchProofreaders();
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Action Failed',
            text: 'Could not update account privileges.',
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

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Proofreader Registry</h1>
          <p className="text-white-50">Manage qualifications and membership levels of active archives contributors</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card-custom p-4 p-md-5">
                <h3 className="font-serif text-gold mb-4 border-bottom pb-2">Active Proofreaders</h3>
                
                {loading ? (
                  <div className="text-center py-5">
                    <span className="spinner-border spinner-border-sm text-gold" role="status"></span>
                  </div>
                ) : proofreaders.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-custom table-striped align-middle">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Email Address</th>
                          <th>Role Type</th>
                          <th>Contributions</th>
                          <th>Status</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proofreaders.map((pr, idx) => (
                          <tr key={idx}>
                            <td className="fw-bold text-white-80">{pr.username}</td>
                            <td className="font-monospace text-white-50">{pr.email}</td>
                            <td className="text-uppercase small"><span className="badge bg-gold text-dark">{pr.role}</span></td>
                            <td>{pr.songsCount || 0} songs edited</td>
                            <td>
                              <span className="badge bg-success text-white">Active</span>
                            </td>
                            <td className="text-end">
                              <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => handleCancelApproval(pr.email)}>
                                Deactivate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-white-50 py-5">
                    <i className="bi bi-people fs-1 text-gold d-block mb-3"></i>
                    No active proofreaders registered in the database.
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

export default ProofreaderDetails;
