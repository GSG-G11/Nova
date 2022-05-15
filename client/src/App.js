import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoginButton, SignupButton } from './components/Forms';
import { checkUser } from './redux/features/auth/authSlice';
import ProfileTabs from './components/ProfileTabs';

const App = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="App">
      {loading ? 'Loading...' : (
        <div>
          hi
          <SignupButton />
          <LoginButton />
          {user && <ProfileTabs />}
        </div>
      )}
    </div>
  );
};

export default App;
