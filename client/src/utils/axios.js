import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL

const instance = axios.create({
  baseURL: api,
});

export default instance;
