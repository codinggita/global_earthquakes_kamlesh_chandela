export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getMagnitudeColor = (mag) => {
  if (mag >= 7) return 'error';
  if (mag >= 6) return 'warning';
  if (mag >= 5) return 'info';
  if (mag >= 4) return 'success';
  return 'default';
};

export const getDepthLabel = (depth) => {
  if (depth < 70) return 'Shallow';
  if (depth < 300) return 'Intermediate';
  return 'Deep';
};

export const getMagnitudeLabel = (mag) => {
  if (mag < 4) return 'Minor';
  if (mag < 5) return 'Light';
  if (mag < 6) return 'Moderate';
  if (mag < 7) return 'Strong';
  if (mag < 8) return 'Major';
  return 'Great';
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const buildQueryString = (params) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined && value !== null)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
    .join('&');
  return query ? '?' + query : '';
};
