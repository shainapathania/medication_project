import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/Login.css'; // Custom CSS for additional styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Assuming the response contains token, user_id, and role
      const { token, user_id, role } = response.data;

      // Store token, user_id, and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('role', role); // Storing role in localStorage

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/super-admin-dashboard'); // Redirect to Super Admin Dashboard
      } else if (role === 'patient') {
        navigate('/medicine-schedule'); // Redirect to Medicine Schedule
      } else {
        setError('Unauthorized role. Please contact support.');
      }
    } catch (err) {
      // Display specific error message if available
      const errorMessage = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
