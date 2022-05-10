import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { SignupModal } from './components/Forms';
import LoginButton from './components/Login/LoginButton';
import { checkUser } from './redux/features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="App">
      <SignupModal />
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
