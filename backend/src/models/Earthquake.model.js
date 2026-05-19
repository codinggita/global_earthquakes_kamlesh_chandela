const mongoose = require('mongoose');

const earthquakeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  time: {
    type: Date,
    required: true,
    index: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  place: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    default: 'earthquake',
    enum: ['earthquake', 'quarry', 'explosion', 'landslide', 'icequake', 'other'],
    index: true
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  depth: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  mag: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  magType: {
    type: String,
    enum: ['mb', 'ml', 'ms', 'mw', 'md', 'mh', 'mblg', 'mb_lg', 'mc', 'mwr', 'mww', 'mwb', 'mwc', 'mi', 'mlv', 'mfa'],
    index: true
  },
  magError: Number,
  magNst: Number,
  horizontalError: Number,
  depthError: Number,
  nst: String,
  gap: Number,
  dmin: Number,
  rms: Number,
  net: {
    type: String,
    index: true
  },
  locationSource: String,
  magSource: String,
  status: {
    type: String,
    enum: ['reviewed', 'automatic', 'deleted'],
    default: 'reviewed',
    index: true
  },
  country: {
    type: String,
    index: true
  },
  year: Number,
  month: Number,
  day: Number,
  hour: Number,
  depthCategory: {
    type: String,
    enum: ['shallow', 'intermediate', 'deep'],
    default: 'shallow'
  },
  magnitudeCategory: {
    type: String,
    enum: ['minor', 'light', 'moderate', 'strong', 'major', 'great'],
    default: 'minor'
  },
  isDeleted: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'datas'
});

earthquakeSchema.index({ latitude: 1, longitude: 1 });
earthquakeSchema.index({ mag: -1 });
earthquakeSchema.index({ depth: 1 });
earthquakeSchema.index({ time: -1 });
earthquakeSchema.index({ place: 'text' });
earthquakeSchema.index({ country: 1, status: 1 });
earthquakeSchema.index({ magType: 1, net: 1 });

earthquakeSchema.pre('save', function(next) {
  // Auto-generate a unique ID for manual entries if missing
  if (!this.id) {
    this.id = 'manual_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  }

  const parts = this.place.split(',');
  this.country = parts[parts.length - 1]?.trim() || 'Unknown';

  const date = new Date(this.time);
  this.year = date.getUTCFullYear();
  this.month = date.getUTCMonth() + 1;
  this.day = date.getUTCDate();
  this.hour = date.getUTCHours();

  if (this.depth < 70) this.depthCategory = 'shallow';
  else if (this.depth < 300) this.depthCategory = 'intermediate';
  else this.depthCategory = 'deep';

  if (this.mag < 4) this.magnitudeCategory = 'minor';
  else if (this.mag < 5) this.magnitudeCategory = 'light';
  else if (this.mag < 6) this.magnitudeCategory = 'moderate';
  else if (this.mag < 7) this.magnitudeCategory = 'strong';
  else if (this.mag < 8) this.magnitudeCategory = 'major';
  else this.magnitudeCategory = 'great';

  next();
});

earthquakeSchema.virtual('coordinates').get(function() {
  return [this.longitude, this.latitude];
});

earthquakeSchema.virtual('isOceanic').get(function() {
  // Simple heuristic for oceanic: if it doesn't match a specific country logic 
  // or if explicitly marked. For now, just a virtual placeholder.
  return this.country === 'Ocean' || this.country === 'Unknown';
});

earthquakeSchema.statics.getHighMagnitude = function(minMag = 6) {
  return this.find({ mag: { $gte: minMag } }).sort({ mag: -1 });
};

earthquakeSchema.statics.getRecent = function(limit = 10) {
  return this.find().sort({ time: -1 }).limit(limit);
};

module.exports = mongoose.model('Earthquake', earthquakeSchema);
