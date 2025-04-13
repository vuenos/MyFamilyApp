import axios from 'axios';
// import {Platform} from 'react-native';

const API_HOST =
  // Platform.OS === 'android' ? 'http://10.0.2.2:5500' : 'http://localhost:5500';
  'https://node-bed.vercel.app';

export const axiosInstance = axios.create({
  baseURL: `${API_HOST}/api/v1`,
  timeout: 5000,
});
