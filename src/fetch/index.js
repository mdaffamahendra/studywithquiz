import axios from "axios";
import store from "../redux/store"; 
import { refreshAuthToken } from "../redux/slice/UsersSlice";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor Response (Handle 401 & Refresh Token Otomatis)
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Hindari infinite loop
      try {
        const newToken = await store.dispatch(refreshAuthToken()); // Refresh Token
        localStorage.setItem("token", newToken.payload.accessToken); // Simpan token baru
        originalRequest.headers.Authorization = `Bearer ${newToken.payload.accessToken}`;
        return axios(originalRequest); 
      } catch (err) {
        console.error("Gagal refresh token:", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
)


export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours} jam ${minutes} menit ${secs} detik`;
};

export const login = async (url, data) => {
  try {
    const response = await axios.post(`${API_URL}/${url}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const signup = async (url, data) => {
  try {
    const response = await axios.post(`${API_URL}/${url}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postData = async (url, data, token) => {
  try {
    const response = await axios.post(`${API_URL}/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editData = async (url, data, token) => {
  try {
    const response = await axios.put(`${API_URL}/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getData = async (url, token) => {
  try {
    const response = await axios.get(`${API_URL}/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteData = async (url, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
