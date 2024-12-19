import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteMedicine = ({ id, onDelete }) => {
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      // Call API to delete the medicine
      await axios.delete(`http://localhost:5000/api/medicines/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(id);  // Update parent state to remove the deleted item
      navigate('/medicine-schedule');  // Redirect to the medicine schedule page
    } catch (err) {
      setError('Failed to delete the medicine.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Medicine'}
      </button>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default DeleteMedicine;
