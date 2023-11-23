import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
