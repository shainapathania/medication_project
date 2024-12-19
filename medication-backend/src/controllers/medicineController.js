const db = require('../config/db');  // Ensure this is correctly importing the db configuration

// Function to create a new medicine entry
exports.createMedicine = (req, res) => {
  const { user_id, name, dosage, schedule_time } = req.body;

  if (!user_id || !name || !dosage || !schedule_time) {
    return res.status(400).json({ message: 'All fields (user_id, name, dosage, schedule_time) are required.' });
  }

  const query = 'INSERT INTO medicines (user_id, name, dosage, schedule_time) VALUES (?, ?, ?, ?)';

  db.execute(query, [user_id, name, dosage, schedule_time], (err, result) => {
    if (err) {
      console.error('Error adding medicine schedule:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Medicine schedule added successfully', data: result });
  });
};

// Function to get all medicines for a specific user
exports.getMedicines = (req, res) => {
  const { user_id } = req.params;  // Correctly extracting user_id from the request parameter

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const query = 'SELECT * FROM medicines WHERE user_id = ?';

  db.execute(query, [user_id], (err, result) => {
    if (err) {
      console.error('Error fetching medicines:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'No medicines found for this user.' });
    }
    res.status(200).json({ message: 'Medicines fetched successfully', data: result });
  });
};

// Function to update a medicine schedule
exports.updateMedicine = (req, res) => {
  const { id } = req.params;  // Now getting ID from URL params
  const { name, dosage, schedule_time } = req.body;

  if (!id || !name || !dosage || !schedule_time) {
    return res.status(400).json({ message: 'ID, name, dosage, and schedule_time are required to update medicine.' });
  }

  const query = 'UPDATE medicines SET name = ?, dosage = ?, schedule_time = ? WHERE id = ?';

  db.execute(query, [name, dosage, schedule_time, id], (err, result) => {
    if (err) {
      console.error('Error updating medicine:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medicine not found to update.' });
    }
    res.status(200).json({ message: 'Medicine updated successfully', data: result });
  });
};


// Function to delete a medicine schedule
exports.deleteMedicine = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Medicine ID is required.' });
  }

  const query = 'DELETE FROM medicines WHERE id = ?';

  db.execute(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting medicine:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medicine not found to delete.' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  });
};
