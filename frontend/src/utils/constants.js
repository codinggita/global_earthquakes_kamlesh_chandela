export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const MAGNITUDE_COLORS = {
  minor: '#4caf50',
  light: '#8bc34a',
  moderate: '#ffeb3b',
  strong: '#ff9800',
  major: '#f44336',
  great: '#b71c1c',
};

export const DEPTH_CATEGORIES = {
  shallow: '#4caf50',
  intermediate: '#ff9800',
  deep: '#f44336',
};

export const ITEMS_PER_PAGE = [10, 25, 50, 100];

export const MAGNITUDE_TYPES = ['mb', 'ml', 'ms', 'mw', 'md', 'mh', 'mblg', 'mb_lg', 'mc', 'mwr', 'mww', 'mwb', 'mwc', 'mi', 'mlv', 'mfa'];

export const STATUS_OPTIONS = ['reviewed', 'automatic', 'deleted'];
