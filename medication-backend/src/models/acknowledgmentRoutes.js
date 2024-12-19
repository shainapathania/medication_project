const db = require('../config/db');

const Acknowledgment = {
  create: (userId, medicineId, status, timestamp, callback) => {
    db.query('INSERT INTO acknowledgment_logs (user_id, medicine_id, status, timestamp) VALUES (?, ?, ?, ?)',
      [userId, medicineId, status, timestamp], 
      callback);
  },
  getByUserId: (userId, callback) => {
    db.query('SELECT * FROM acknowledgment_logs WHERE user_id = ?', [userId], callback);
  }
};

module.exports = Acknowledgment;
