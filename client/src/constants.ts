import axios from 'axios';

export const URL = 'https://localhost:3000';
export const API_URL = 'https://localhost:3000/api/signin';
export const axios_turbine = axios.create({baseURL: API_URL});
