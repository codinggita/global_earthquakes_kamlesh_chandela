const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Earthquake = require('../models/Earthquake.model');
const User = require('../models/User.model');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Earthquake.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    const dataPath = path.join(__dirname, '../data/earthquakes.json');
    if (fs.existsSync(dataPath)) {
      let rawData = fs.readFileSync(dataPath, 'utf8');
      if (rawData.charCodeAt(0) === 0xFEFF) rawData = rawData.slice(1);
      const earthquakes = JSON.parse(rawData);
      const result = await Earthquake.insertMany(earthquakes, { ordered: false });
      console.log('Inserted ' + result.length + ' earthquakes');
    } else {
      console.log('No earthquake data file found. Skipping earthquake seed.');
    }

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });
    console.log('Created admin user: ' + adminUser.email);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
