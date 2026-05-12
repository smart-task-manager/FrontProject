import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5170/api",
});

// מוסיף אוטומטית את ה-token לכל בקשה
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// מטפל בשגיאת 401 — טוקן פג תוקף
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");  // ✅ מוחק את הטוקן
      window.location.href = "/login";   // ✅ מנתב ללוגין
    }
    // כאן אפשר להפעיל ספריית התראות (כמו react-toastify)
    // alert(error.response?.data?.message || "התרחשה שגיאה בתקשורת עם השרת");
    return Promise.reject(error);
  }
);

export default API;
