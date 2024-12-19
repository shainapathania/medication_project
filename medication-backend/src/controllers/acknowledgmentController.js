const db = require('../config/db'); 
exports.logAcknowledgment = (req, res) => {
  const { user_id, medicine_id, status } = req.body;

  const query = 'INSERT INTO acknowledgment_logs (user_id, medicine_id, status, timestamp) VALUES (?, ?, ?, NOW())';

  db.execute(query, [user_id, medicine_id, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Acknowledgment logged successfully' });
  });
};
