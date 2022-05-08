import { get } from 'axios';

const checkUser = async () => {
  try {
    const response = await get('/api/users/checkAuth');
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default checkUser;
