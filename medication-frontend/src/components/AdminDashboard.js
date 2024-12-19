import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ userId: '', startDate: '', endDate: '' });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/logs', {
          headers: { Authorization: `Bearer ${token}` },
          params: filter,
        });
        setLogs(response.data);
      } catch (err) {
        setError('Failed to fetch logs');
      }
    };

    fetchLogs();
  }, [filter]);

  return (
    <div>
      <h2>Super Admin Dashboard</h2>
      <div>
        <input
          type="text"
          placeholder="Patient ID"
          value={filter.userId}
          onChange={(e) => setFilter({ ...filter, userId: e.target.value })}
        />
        <input
          type="date"
          value={filter.startDate}
          onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
        />
        <input
          type="date"
          value={filter.endDate}
          onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
        />
        <button onClick={() => setFilter({ ...filter })}>Filter</button>
      </div>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Medicine ID</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.user_id}</td>
              <td>{log.medicine_id}</td>
              <td>{log.status}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
