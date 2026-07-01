import axios from 'axios';

const apiBaseUrl = ('https://hrthabebackend.duckdns.org' || 'http://localhost:8800').replace(/\/+$/, '');

axios.defaults.baseURL = apiBaseUrl;

export const API_BASE_URL = apiBaseUrl;
