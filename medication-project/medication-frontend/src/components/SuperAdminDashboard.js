import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SuperAdminDashboard.css';  // Custom CSS file

const SuperAdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState('');  // Add state for filtering by patient ID

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/logs', {
        headers: { Authorization: `Bearer ${token}` },
        params: { start_date: startDate, end_date: endDate, user_id: userId }, // Include user_id filter
      });
      setLogs(response.data);
    } catch (err) {
      setError('Failed to fetch logs');
    }
  };

  const handleDateFilter = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Super Admin Dashboard</h2>
      
      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleDateFilter} className="mb-4">
        <div className="d-flex justify-content-center">
          {/* Filter by patient ID */}
          <input
            type="number"
            className="form-control me-2 filter-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Filter by Patient ID"
          />
          <input
            type="date"
            className="form-control me-2 filter-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control me-2 filter-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button type="submit" className="btn btn-info">Apply Filter</button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>User ID</th>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.length ? (
              logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.user_id}</td>
                  <td>{log.medicine_name}</td> {/* Display the correct field here */}
                  <td>{log.dosage}</td>
                  <td>{log.status}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
