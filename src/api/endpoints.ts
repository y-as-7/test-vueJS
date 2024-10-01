export const BASE_URL = 'https://eve-dev.rizme-labs.xyz/api';

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

export const USER_ENDPOINTS = {
  GET_USER: `${BASE_URL}/user`,
  UPDATE_USER: `${BASE_URL}/user`,
};

export const PRODUCT_ENDPOINTS = {
  CREATE_PRODUCT: `${BASE_URL}/product/add`,
  GET_PRODUCT: (id: string) => `${BASE_URL}/products/${id}`,
  UPDATE_PRODUCT: (id: string) => `${BASE_URL}/products/${id}`,
  GET_PRODUCTS: `${BASE_URL}/products`,
  DELETE_PRODUCT: `${BASE_URL}/product`,
};  




