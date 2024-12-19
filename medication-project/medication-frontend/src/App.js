import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MedicineSchedule from './components/MedicineSchedule';
import Home from './components/Home';
import AddMedicine from './components/AddMedicine';
import EditMedicine from './components/EditMedicine';
import DeleteMedicine from './components/DeleteMedicine';
import SuperAdminDashboard from './components/SuperAdminDashboard';
// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Make sure token is stored under the correct key
  return !!token; // Returns true if token exists, false otherwise
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected route for medicine schedule */}
        <Route
          path="/super-admin-dashboard"
          element={isAuthenticated() && localStorage.getItem('role') === 'admin' ? <SuperAdminDashboard /> : <Navigate to="/login" />}
/>
        <Route 
          path="/medicine-schedule" 
          element={isAuthenticated() ? <MedicineSchedule /> : <Navigate to="/login" />} 
        />
          <Route
          path="/add-medicine"
          element={isAuthenticated() ? <AddMedicine /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-medicine/:id"
          element={isAuthenticated() ? <EditMedicine /> : <Navigate to="/login" />}
        />
         <Route
          path="/delete-medicine/:id"
          element={isAuthenticated() ? <DeleteMedicine/> : <Navigate to="/login" />}
        />
        {/* Add other routes as needed */}
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all unknown routes to login */}
      </Routes>
    </Router>
  );
};

export default App;
