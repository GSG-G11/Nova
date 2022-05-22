import { get } from 'axios';

const checkUser = async () => {
  const { data: { data } } = await get('/api/users/checkAuth');
  return data;
};

const authService = {
  checkUser,
};
export default authService;
