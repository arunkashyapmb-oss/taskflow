import axios from "axios";

//Maine Axios Request Interceptor use kiya hai jo har request ke saath access token Authorization header me bhejta hai.
// Response Interceptor 401 Unauthorized ko detect karta hai. Agar access token expire ho jata hai, 
// to refresh token ki help se naya access token generate karta hai, 
// localStorage update karta hai aur original request automatically retry kar deta hai. 
// Agar refresh token bhi invalid ho, to user ko logout karke login page par redirect kar deta hai.

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use((config) => {  // ye fuction har request ke sath call hoga, aur ye token ko request ke header me add karega
  // ye function req. send hone se phle chalege or check karega ki localStorage me token hai ya nahi, agar hai to usko request ke header me add karega
  
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  // ye res. aane ke bad chalega
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    // taki againy request retry na ho, agar token refresh ho chuka hai to

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // New Access Token
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;

        // Save New Token
        localStorage.setItem("token", newAccessToken);

        // Retry Previous Request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

