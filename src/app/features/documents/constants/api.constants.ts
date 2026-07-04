/**
 * API Configuration Constants
 * Centralized API endpoint configuration
 */

/**
 * Base URL for the backend API
 * This should be updated based on environment (dev/prod)
 */
export const API_BASE_URL = 'http://127.0.0.1:3658/m1/1212435-1208182-default/api';

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  CHAT: {
    ASK: `${API_BASE_URL}/Chat/ask`
  },
  AUTH: {
    LOGIN: `${API_BASE_URL}/Auth/login`,
    REGISTER: `${API_BASE_URL}/Auth/register`,
    REFRESH: `${API_BASE_URL}/Auth/refresh-token`
  },
  DOCUMENTS: {
    BASE: `${API_BASE_URL}/Document`
  }
} as const;
