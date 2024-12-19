import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMedicine = () => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams(); // Medicine ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');

        const response = await axios.get(`http://localhost:5000/api/medicines/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, dosage, schedule_time } = response.data.data;
        setMedicineName(name);
        setDosage(dosage);
        setScheduleTime(schedule_time);
      } catch (err) {
        setError('Error fetching medicine data.');
      }
    };

    fetchMedicine();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/medicines/${id}`,
        {
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
      setSuccessMessage('Medicine updated successfully!');
      navigate('/medicine-schedule'); // Redirect to medicine schedule page
    } catch (err) {
      setError('Failed to update medicine.');
    }
  };

  return (
    <div>
      <h3>Edit Medicine Schedule</h3>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Medicine</button>
      </form>
    </div>
  );
};

export default EditMedicine;
