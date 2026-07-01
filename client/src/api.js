import axios from 'axios';

const apiBaseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:8800').replace(/\/+$/, '');

axios.defaults.baseURL = apiBaseUrl;

export const API_BASE_URL = apiBaseUrl;
