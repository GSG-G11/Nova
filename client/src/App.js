import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/common/Footer';
import { LoginButton, SignupButton } from './components/Forms';
import { checkUser } from './redux/features/auth/authSlice';
import UserInfo from './components/UserInfo';
import ProfileTabs from './components/ProfileTabs';
import ActiveMembers from './components/ActiveMembers';
import Resources from './components/Resources';
import VerifyAccount from './components/VerifyAccount';
import Header from './components/Header';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="App">
      <SignupButton />
      <LoginButton />
      <Header />
      {loading ? 'Loading...' : (
        <div>
          <ProfileTabs />
          <Resources />
        </div>
      )}
      <ActiveMembers />
      <Routes>
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/auth/verify" element={<VerifyAccount />} />
      </Routes>
      <Resources />
      <Footer />
    </div>
  );
};

export default App;
