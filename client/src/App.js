import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/common/Footer';
import { LoginButton, SignupButton } from './components/Forms';
import { checkUser } from './redux/features/auth/authSlice';
import UserInfo from './components/UserInfo';
import ProfileTabs from './components/ProfileTabs';
import Challenges from './components/Challenges';
import ActiveMembers from './components/ActiveMembers';
import Resources from './components/Resources';
import VerifyAccount from './components/VerifyAccount';
import IntreviewerApp from './components/IntreviewerApp';
import ClientReviews from './components/ClientReviews';
import Partner from './components/Partner';
import HowNovaWork from './components/HowNovaWork';
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
      <HowNovaWork />
      <LoginButton />
      <ProfileTabs />
      <Partner />
      <ActiveMembers />
      <IntreviewerApp />
      <ClientReviews />
      <Routes>
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/auth/verify" element={<VerifyAccount />} />
      </Routes>
      <Challenges />
      <Resources />
      <Footer />

    </div>
  );
};

export default App;
