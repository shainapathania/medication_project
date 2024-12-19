const db = require('../config/db');

const User = {
  create: (name, email, passwordHash, role, callback) => {
    db.query('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', 
      [name, email, passwordHash, role], 
      callback);
  },
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  }
};

module.exports = User;
