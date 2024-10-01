export const BASE_URL = process.env.VUE_APP_API_URL || '';

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

export const USER_ENDPOINTS = {
  GET_USER: `${BASE_URL}/user`,
  UPDATE_USER: `${BASE_URL}/user`,
};




