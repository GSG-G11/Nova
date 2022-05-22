import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUser } from './redux/features/auth/authSlice';
import InterviewForm from './components/Forms/Interview/InterviewForm';
import UserInfo from './components/UserInfo';
import Navbar from './components/Navbar';
import Footer from './components/common/Footer';
import Landing from './components/Landing';
import VerifyAccount from './components/VerifyAccount';

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
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/users/:id" element={<UserInfo />} />
            <Route path="/auth/verify" element={<VerifyAccount />} />
          </Routes>
        </div>
      )}
      <InterviewForm />
      <Footer />

    </div>
  );
};

export default App;
