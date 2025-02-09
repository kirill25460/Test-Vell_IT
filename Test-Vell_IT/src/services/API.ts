import axios from 'axios';

axios.defaults.baseURL = `http://192.168.0.20:5000`;

export const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

interface Credentials {
  username: string;
  password: string;
}

interface User {

  username: string;
  email: string;
  accessToken: string;
}

// Регистрация
export const registrationFoo = async (credentials: Credentials): Promise<User> => {
  const { data } = await axios.post('/api/v1/auth/register', credentials);
  return data;
};

// Логин
export const loginFoo = async (credentials: Credentials): Promise<User> => {
  const { data } = await axios.post('/api/v1/auth/login', credentials);
  
  localStorage.setItem("accessToken", data.accessToken);
  return data;
};

// Получение текущего пользователя
export const getCurrentUser = async (): Promise<User> => {
  const { data } = await axios.get('/api/v1/auth/me');
  return data;
};
