import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoginButton, SignupButton } from './components/Forms';
import { checkUser } from './redux/features/auth/authSlice';
import ProfileTabs from './components/ProfileTabs/ProfileTabs';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="App">
      <SignupButton />
      {loading ? 'Loading...' : (
        <div>
          hi
        </div>
      )}
      <LoginButton />
      <ProfileTabs />
    </div>
  );
};

export default App;
