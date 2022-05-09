import { get } from 'axios';

const checkUser = async () => {
  const response = await get('/api/users/checkAuth');
  const { data } = response;
  return data;
};

const authService = {
  checkUser,
};
export default authService;
