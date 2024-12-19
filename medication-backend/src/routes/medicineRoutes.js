const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Routes
router.post('/', medicineController.createMedicine); // Add a new medicine
router.get('/:user_id', medicineController.getMedicines); // Get medicines for a specific user
//router.put('/', medicineController.updateMedicine); // Update a medicine
router.put('/:id', medicineController.updateMedicine); // Updated to use URL param for ID

router.delete('/:id', medicineController.deleteMedicine); // Delete a medicine

module.exports = router;
