const validateEarthquake = (data) => {
  if (!data.time) return 'Time is required';
  if (data.latitude === undefined || data.latitude < -90 || data.latitude > 90) return 'Valid latitude is required (-90 to 90)';
  if (data.longitude === undefined || data.longitude < -180 || data.longitude > 180) return 'Valid longitude is required (-180 to 180)';
  if (data.depth === undefined || data.depth < 0 || data.depth > 1000) return 'Valid depth is required (0-1000 km)';
  if (data.mag === undefined || data.mag < 0 || data.mag > 10) return 'Valid magnitude is required (0-10)';
  if (!data.place) return 'Place is required';
  return null;
};

const validateUser = (data) => {
  if (!data.name || data.name.length < 2) return 'Name must be at least 2 characters';
  if (!data.email) return 'Email is required';
  if (!data.password || data.password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

module.exports = { validateEarthquake, validateUser };
