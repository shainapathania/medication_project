import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/Home.css'; // Import custom CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Medication Reminder</h1>
        <p>Welcome users</p>
        <div className="button-group">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;