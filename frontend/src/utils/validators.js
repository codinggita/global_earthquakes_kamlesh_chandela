export const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateEarthquake = (data) => {
  const errors = {};
  if (!data.id) errors.id = 'Earthquake ID is required';
  if (!data.time) errors.time = 'Time is required';
  if (!data.place) errors.place = 'Place is required';
  if (data.latitude === undefined || data.latitude < -90 || data.latitude > 90) errors.latitude = 'Valid latitude is required (-90 to 90)';
  if (data.longitude === undefined || data.longitude < -180 || data.longitude > 180) errors.longitude = 'Valid longitude is required (-180 to 180)';
  if (data.depth === undefined || data.depth < 0 || data.depth > 1000) errors.depth = 'Valid depth is required (0-1000 km)';
  if (data.mag === undefined || data.mag < 0 || data.mag > 10) errors.mag = 'Valid magnitude is required (0-10)';
  return Object.keys(errors).length > 0 ? errors : null;
};
