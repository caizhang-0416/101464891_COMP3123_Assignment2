const employeeRoutes = require('./routes/employee');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); 

const app = express();
const PORT = process.env.PORT || 3013
;

// Middleware
app.use(express.json());

// Connect to MongoDB 
mongoose.connect('mongodb+srv://caizhang0416:qffxCvqwLRcejOxo@comp3123-assignment1.swm1n.mongodb.net/?retryWrites=true&w=majority&appName=comp3123-assignment1')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  // test employee routes
  app.use('/api/v1/emp', employeeRoutes);
//test user sign up
app.use('/api/v1/user', userRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
