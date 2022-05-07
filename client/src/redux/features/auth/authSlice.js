import axios from 'axios';

const login = async (userData) => {
  const response = await axios.post('/api/login', userData);

  return response.data;
};

const register = async (userData) => {
  const response = await axios.post('/api/register', userData);

  return response.data;
};

const logout = async () => {
  await axios.post('/api/logout');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
