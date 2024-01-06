import axios from 'axios';
import { SERVER_DOMAIN } from '@utils/constants';

const api = axios.create({
  baseURL: SERVER_DOMAIN,
  withCredentials: true,
});

export default api;
