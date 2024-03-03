import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Headers': 'X-Requested-With',
  },
});

instance.interceptors.response.use(
  res => {
    if (res && res.data) {
      return res.data;
    }
    return res.data;
  },
  error => {
    return Promise.reject(error);
  },
);

export const getAllProducts = () => {
  return instance.get('/products?limit=0')
}

export const getProduct = (id) => {
    return instance.get(`/products/${id}`)
}

export const addProduct = (body) => {
    return instance.post('/products/add', body)
}

export const editProduct = (id, body) => {
    return instance.put(`/products/${id}`, body)
}

export const deleteProduct = (id) => {
  return instance.delete(`/products/${id}`)
}