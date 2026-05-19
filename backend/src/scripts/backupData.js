const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Earthquake = require('../models/Earthquake.model');
require('dotenv').config();

const backupData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const earthquakes = await Earthquake.find({}).lean();
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(backupDir, 'earthquakes-backup-' + timestamp + '.json');
    fs.writeFileSync(filePath, JSON.stringify(earthquakes, null, 2));
    console.log('Backup saved: ' + filePath + ' (' + earthquakes.length + ' records)');

    process.exit(0);
  } catch (error) {
    console.error('Error backing up data:', error);
    process.exit(1);
  }
};

backupData();
