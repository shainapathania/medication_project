const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to fetch acknowledgment logs
router.get('/logs', adminController.getAcknowledgmentLogs);

module.exports = router;
