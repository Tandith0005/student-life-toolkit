import axios from 'axios';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default Axios;
