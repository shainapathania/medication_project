require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes'); // Authentication routes
const medicineRoutes = require('./src/routes/medicineRoutes'); // Medicine routes
const adminRoutes=require('./src/routes/adminRoutes')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mount the authRoutes at '/api/auth'
app.use('/api/auth', authRoutes);

// Mount the medicineRoutes at '/api/medicines'
app.use('/api/medicines', medicineRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
