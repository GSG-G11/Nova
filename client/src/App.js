import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/common/Footer';
import { LoginButton, SignupButton } from './components/Forms';
import { checkUser } from './redux/features/auth/authSlice';
import UserInfo from './components/UserInfo';
import ProfileTabs from './components/ProfileTabs';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <>
      <div className="App">
        <SignupButton />
        {loading ? 'Loading...' : (
          <div>
            hi
          </div>
        )}
        <LoginButton />
        <ProfileTabs />
        <Footer />

      </div>
      <Routes>
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </>
  );
};

export default App;
