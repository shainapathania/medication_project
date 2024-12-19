const db = require('../config/db');

const Medicine = {
  create: (userId, name, dosage, scheduleTime, callback) => {
    db.query('INSERT INTO medicines (user_id, name, dosage, schedule_time) VALUES (?, ?, ?, ?)',
      [userId, name, dosage, scheduleTime],
      callback);
  },
  getByUserId: (userId, callback) => {
    db.query('SELECT * FROM medicines WHERE user_id = ?', [userId], callback);
  },
  update: (id, userId, name, dosage, scheduleTime, callback) => {
    db.query('UPDATE medicines SET name = ?, dosage = ?, schedule_time = ? WHERE id = ? AND user_id = ?',
      [name, dosage, scheduleTime, id, userId], callback);
  },
  delete: (id, userId, callback) => {
    db.query('DELETE FROM medicines WHERE id = ? AND user_id = ?', [id, userId], callback);
  }
};

module.exports = Medicine;
