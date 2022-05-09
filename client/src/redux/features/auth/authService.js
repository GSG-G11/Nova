import { get } from 'axios';

const checkUser = async () => {
  const response = await get('/api/users/checkAuth');
  return response.data;
};

const authService = {
  checkUser,
};
export default authService;
