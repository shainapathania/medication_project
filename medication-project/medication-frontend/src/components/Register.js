import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/Register.css'; // Import custom CSS

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role is 'patient'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      // Send data to backend for registration
      const response = await axios.post('http://localhost:5000/api/auth/signup', { 
        name, 
        email, 
        password, 
        role 
      });
      
      // Check backend response for success
      if (response.status === 201) {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (err) {
      // Handle error messages from the backend
      const errorMessage = err.response?.data?.error || 'Registration failed, please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="" disabled>Select Role</option>
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Register</button>
        </form>
        {error && <p className="text-danger text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
