export const numberFormatter = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num?.toLocaleString() || '0';
};

export const decimalFormatter = (num, decimals = 2) => {
  if (num === undefined || num === null) return 'N/A';
  return Number(num).toFixed(decimals);
};

export const percentageFormatter = (value, total) => {
  if (!total) return '0%';
  return ((value / total) * 100).toFixed(1) + '%';
};

export const dateFormatter = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const timeFormatter = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const dateTimeFormatter = (date) => {
  if (!date) return 'N/A';
  return dateFormatter(date) + ' ' + timeFormatter(date);
};
