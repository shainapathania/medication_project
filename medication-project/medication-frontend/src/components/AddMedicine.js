import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (!token || !userId) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/medicines',
        {
          user_id: userId,
          name: medicineName,
          dosage,
          schedule_time: scheduleTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage('Medicine added successfully!');
      setMedicineName('');
      setDosage('');
      setScheduleTime('');
    } catch (err) {
      setError('Failed to add medicine.');
    }
  };

  return (
    <div>
      <h3>Add Medicine Schedule</h3>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Schedule Time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          required
        />
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
