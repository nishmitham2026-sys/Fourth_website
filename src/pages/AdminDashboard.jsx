import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [userCounts, setUserCounts] = useState({
    ActiveUsers: 0,
    Week: 0,
    Month: 0,
    Year: 0
  });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Fetch user metrics
      try {
        const counts = await adminService.getUserCounts();
        setUserCounts(counts || { ActiveUsers: 0, Week: 0, Month: 0, Year: 0 });
      } catch (err) {
        console.error('Error fetching user counts:', err);
      }

      // Fetch visitor activity logs
      try {
        const logs = await adminService.getVisitorLogs();
        const formattedLogs = logs.map((log) => {
          const start = new Date(log.startTime);
          const end = log.endTime ? new Date(log.endTime) : new Date();
          const diffSec = (end.getTime() - start.getTime()) / 1000;
          const mins = Math.floor(diffSec / 60);
          const secs = Math.floor(diffSec % 60);
          
          // Formatted timezone shift for display (+5:30)
          const localStart = new Date(start.getTime() + 5.5 * 60 * 60 * 1000);

          return {
            ...log,
            formattedStartTime: localStart.toISOString().replace('T', ' ').substring(0, 19),
            duration: `${mins} Mins, ${secs} Sec`
          };
        });
        setVisitorLogs(formattedLogs);
      } catch (err) {
        console.error('Error fetching visitor logs:', err);
      }

      // Fetch pending proofreader requests
      try {
        const requests = await adminService.getPendingRequests();
        setPendingRequests(Array.isArray(requests) ? requests : []);
      } catch (err) {
        console.error('Error fetching pending requests:', err);
      }

    } catch (err) {
      setErrorMsg('Failed to load admin logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApprove = async (email, username, role) => {
    Swal.fire({
      title: 'Approve Account',
      text: `Are you sure you want to approve ${username} (${email}) as a ${role}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom',
        confirmButton: 'swal2-confirm-custom btn btn-success px-4',
        cancelButton: 'btn btn-secondary rounded-pill px-4 ms-2'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await adminService.approveProofreader({ email, username, role });
          Swal.fire({
            icon: 'success',
            title: 'Approved!',
            text: 'Account has been approved successfully.',
            customClass: {
              popup: 'swal2-popup-custom',
              title: 'swal2-title-custom'
            }
          });
          fetchDashboardData();
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Approval Failed',
            text: 'Could not approve account.',
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

  const handleReject = async (email) => {
    Swal.fire({
      title: 'Reject Request',
      text: 'Are you sure you want to cancel or reject this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject',
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
            title: 'Rejected',
            text: 'Request has been rejected.',
            customClass: {
              popup: 'swal2-popup-custom',
              title: 'swal2-title-custom'
            }
          });
          fetchDashboardData();
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Could not reject request.',
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
          <h1 className="font-serif">Admin Dashboard</h1>
          <p className="text-white-50">Manage registered proofreaders, review system logs, and view visitor counts</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          
          {/* Dashboard metrics cards */}
          <div className="row g-4 mb-5">
            <div className="col-sm-6 col-lg-3">
              <div className="card-custom p-4 text-center" style={{ borderLeft: '4px solid #28a745' }}>
                <h6 className="text-white-50 small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Active Users</h6>
                <h2 className="display-6 fw-bold text-white mb-0">{userCounts.ActiveUsers}</h2>
              </div>
            </div>
            
            <div className="col-sm-6 col-lg-3">
              <div className="card-custom p-4 text-center" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
                <h6 className="text-white-50 small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>This Week Visits</h6>
                <h2 className="display-6 fw-bold text-white mb-0">{userCounts.Week}</h2>
              </div>
            </div>
            
            <div className="col-sm-6 col-lg-3">
              <div className="card-custom p-4 text-center" style={{ borderLeft: '4px solid #17a2b8' }}>
                <h6 className="text-white-50 small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>This Month Visits</h6>
                <h2 className="display-6 fw-bold text-white mb-0">{userCounts.Month}</h2>
              </div>
            </div>
            
            <div className="col-sm-6 col-lg-3">
              <div className="card-custom p-4 text-center" style={{ borderLeft: '4px solid #007bff' }}>
                <h6 className="text-white-50 small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>This Year Visits</h6>
                <h2 className="display-6 fw-bold text-white mb-0">{userCounts.Year}</h2>
              </div>
            </div>
          </div>

          <div className="row g-5">
            {/* Left: Pending Requests */}
            <div className="col-lg-5">
              <div className="card-custom p-4">
                <h4 className="font-serif text-gold mb-4 border-bottom pb-2">Pending Approvals</h4>
                
                {loading ? (
                  <div className="text-center py-4">
                    <span className="spinner-border spinner-border-sm text-gold" role="status"></span>
                  </div>
                ) : pendingRequests.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {pendingRequests.map((req, idx) => (
                      <div key={idx} className="p-3 rounded border" style={{ backgroundColor: 'var(--surface-bg)', borderColor: 'var(--border-color)' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="text-white mb-0">{req.username}</h6>
                            <span className="text-white-50 small">{req.email}</span>
                          </div>
                          <span className="badge bg-gold text-dark text-uppercase small">{req.role}</span>
                        </div>
                        {req.proofreaderDetails && (
                          <div className="p-2 bg-black rounded text-white-50 small mb-3 text-start" style={{ fontStyle: 'italic' }}>
                            {req.proofreaderDetails}
                          </div>
                        )}
                        <div className="d-flex gap-2 justify-content-end">
                          <button className="btn btn-danger btn-sm rounded-pill px-3 py-1" onClick={() => handleReject(req.email)}>
                            Reject
                          </button>
                          <button className="btn btn-success btn-sm rounded-pill px-3 py-1 text-dark fw-bold" style={{ backgroundColor: 'var(--accent-gold)' }} onClick={() => handleApprove(req.email, req.username, req.role)}>
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-white-50 py-4">
                    <i className="bi bi-person-check fs-2 text-gold d-block mb-2"></i>
                    No pending approval requests.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Visitor logs table */}
            <div className="col-lg-7">
              <div className="card-custom p-4">
                <h4 className="font-serif text-gold mb-4 border-bottom pb-2">Visitor Activity Logs</h4>
                
                {loading ? (
                  <div className="text-center py-4">
                    <span className="spinner-border spinner-border-sm text-gold" role="status"></span>
                  </div>
                ) : errorMsg ? (
                  <div className="alert alert-danger text-center">{errorMsg}</div>
                ) : visitorLogs.length > 0 ? (
                  <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    <table className="table table-custom table-striped" style={{ fontSize: '0.85rem' }}>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>User</th>
                          <th>IP Address</th>
                          <th>Country</th>
                          <th>Region</th>
                          <th>Start Time</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitorLogs.map((log, idx) => (
                          <tr key={idx}>
                            <td className="text-white-50">{idx + 1}</td>
                            <td className="fw-bold text-white-80">{log.username || 'Guest'}</td>
                            <td className="font-monospace text-white-50">{log.ipAddress}</td>
                            <td>{log.country || 'N/A'}</td>
                            <td>{log.region || 'N/A'}</td>
                            <td>{log.formattedStartTime}</td>
                            <td className="small text-white-50">{log.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-white-50 py-4">
                    <i className="bi bi-file-earmark-bar-graph fs-2 text-gold d-block mb-2"></i>
                    No visitor logs found.
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

export default AdminDashboard;
