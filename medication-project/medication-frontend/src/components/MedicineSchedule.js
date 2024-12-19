import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MedicineSchedule.css'; // Custom CSS file for additional styles

const MedicineSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', dosage: '', schedule_time: '' });
  const [editingMedicine, setEditingMedicine] = useState(null);

  // Fetch schedule on component mount
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        if (!token || !userId) throw new Error('User not authenticated');

        const response = await axios.get(`http://localhost:5000/api/medicines/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchedule(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching the schedule.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Handle acknowledgment
  const handleAcknowledge = async (medicineId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

      if (!token || !userId) {
        setError('User not authenticated');
        return;
      }

      await axios.post(
        'http://localhost:5000/api/acknowledgment',
        {
          user_id: userId,
          medicine_id: medicineId,
          status: 'Taken',
          timestamp: timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchedule(schedule.map((medicine) =>
        medicine.id === medicineId ? { ...medicine, acknowledged: true } : medicine
      ));
    } catch (err) {
      setError('Failed to acknowledge medicine.');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmitMedicine = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      if (!token || !userId) {
        setError('User not authenticated');
        return;
      }

      if (editingMedicine) {
        // Update medicine
        const updatedMedicine = { ...formData };
        await axios.put(
          `http://localhost:5000/api/medicines/${editingMedicine.id}`,
          updatedMedicine,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSchedule(schedule.map((medicine) =>
          medicine.id === editingMedicine.id ? { ...medicine, ...updatedMedicine } : medicine
        ));
        setEditingMedicine(null);
      } else {
        // Add new medicine
        const newMedicine = { ...formData, user_id: userId };
        const response = await axios.post(
          'http://localhost:5000/api/medicines',
          newMedicine,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSchedule([...schedule, { ...newMedicine, id: response.data.data.insertId }]);
      }

      setFormData({ name: '', dosage: '', schedule_time: '' });
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save medicine.');
    }
  };

  // Handle edit button click
  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({ name: medicine.name, dosage: medicine.dosage, schedule_time: medicine.schedule_time });
    setShowForm(true);
  };

  // Handle delete button click
  const handleDelete = async (medicineId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User not authenticated');
        return;
      }

      await axios.delete(`http://localhost:5000/api/medicines/${medicineId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSchedule(schedule.filter((medicine) => medicine.id !== medicineId));
    } catch (err) {
      setError('Failed to delete medicine.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Medicine Schedule</h2>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Medicine'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmitMedicine}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="dosage" className="form-label">Dosage</label>
            <input type="text" className="form-control" id="dosage" name="dosage" value={formData.dosage} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="schedule_time" className="form-label">Schedule Time</label>
            <input type="datetime-local" className="form-control" id="schedule_time" name="schedule_time" value={formData.schedule_time} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-success">
            {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
          </button>
        </form>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : schedule.length ? (
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Schedule Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.dosage}</td>
                <td>{new Date(medicine.schedule_time).toLocaleString()}</td>
                <td>{medicine.acknowledged ? 'Taken' : 'Not Taken'}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(medicine)}>Edit</button>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(medicine.id)}>Delete</button>
                  {!medicine.acknowledged && (
                    <button className="btn btn-success" onClick={() => handleAcknowledge(medicine.id)}>Mark as Taken</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medicines scheduled.</p>
      )}
    </div>
  );
};

export default MedicineSchedule;
