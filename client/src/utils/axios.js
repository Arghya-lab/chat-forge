import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL;

const { token } = JSON.parse(localStorage.getItem("chatForge")).auth;

const instance = axios.create({
  baseURL: api,
});

const authHeader = {
  headers: {
    Authorization: token,
  },
};

const multipartHeader = {
  headers: {
    "Content-Type": "multipart/form-data",   // Important for sending files
    Authorization: token,
  },
}

export default instance;
export { authHeader, multipartHeader };
