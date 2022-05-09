import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginButton from './components/Login/LoginButton';
import { checkUser } from './redux/features/auth/authSlice';
import 'antd/dist/antd.css';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="App">
      {loading ? 'Loading...' : (
        <div>
          hi
        </div>
      )}
      <LoginButton />
    </div>
  );
};

export default App;
