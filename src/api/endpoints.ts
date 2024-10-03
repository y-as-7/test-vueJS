export const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

export const USER_ENDPOINTS = {
  GET_USER: `${BASE_URL}/user`,
  UPDATE_USER: `${BASE_URL}/user`,
};

export const CATEGORY_ENDPOINTS = {
  GET_CATEGORIES: `${BASE_URL}/categories`,
  CREATE_CATEGORY: `${BASE_URL}/categories`,
  GET_CATEGORY: (id: string) => `${BASE_URL}/categories/${id}`,
  UPDATE_CATEGORY: (id: string) => `${BASE_URL}/categories/${id}`,
  DELETE_CATEGORY: `${BASE_URL}/categories`,
};

export const PRODUCT_ENDPOINTS = {
  GET_PRODUCTS: `${BASE_URL}/products`,
  CREATE_PRODUCT: `${BASE_URL}/products`,
  GET_PRODUCT: (id: string) => `${BASE_URL}/products/${id}`,
  UPDATE_PRODUCT: (id: string) => `${BASE_URL}/products/${id}`,
  DELETE_PRODUCT: `${BASE_URL}/product`,
};  




