const mongoose = require('mongoose');
const path = require('path');

// Load .env file explicitly from the same folder as this file
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Debug check: prints the MongoDB URL
console.log('DEBUG: MONGODB_URL =', process.env.MONGODB_URL);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined in .env');
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB server');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

module.exports = connectDB;
