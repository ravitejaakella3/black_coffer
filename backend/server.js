const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dataRoutes = require('./routes/dataRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/data', dataRoutes);

// Import data from JSON file
const importData = async () => {
    try {
        const fs = require('fs');
        const data = JSON.parse(fs.readFileSync('../jsondata.json', 'utf-8'));
        const Data = require('./models/Data');
        
        // Clear existing data
        await Data.deleteMany({});
        
        // Insert new data
        await Data.insertMany(data);
        console.log('Data imported successfully');
    } catch (error) {
        console.error('Error importing data:', error);
    }
};

// Import data when server starts
importData();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5332;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 