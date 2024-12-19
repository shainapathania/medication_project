const express = require('express');
const router = express.Router();
const acknowledgmentController = require('../controllers/acknowledgmentController');

router.post('/', acknowledgmentController.logAcknowledgment);

module.exports = router;
