// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(err);
//   }
// );

// export default API;
import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'http://localhost:5000/api'
});

/*
  ATTACH TOKEN
*/
API.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        'token'
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default API;