// controllers/adminController.js
const db = require('../config/db');

const getAcknowledgmentLogs = (req, res) => {
    const { user_id, start_date, end_date } = req.query;
    let sql = `
        SELECT al.*, m.name AS medicine_name, m.dosage
        FROM acknowledgment_logs al
        JOIN medicines m ON al.medicine_id = m.id
        WHERE 1
    `;

    // Filter by user_id if provided
    if (user_id) {
        sql += ` AND al.user_id = ${user_id}`;
    }

    // Filter by start_date and end_date if provided
    if (start_date && end_date) {
        sql += ` AND al.timestamp BETWEEN '${start_date}' AND '${end_date}'`;
    }

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching logs' });
        }
        res.status(200).json(results);
    });
};


module.exports = { getAcknowledgmentLogs };
