import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUser } from './redux/features/auth/authSlice';
import UserInfo from './components/UserInfo';
import ProfileTabs from './components/ProfileTabs';
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <>
      <div className="App">
        {loading ? 'Loading...' : (
          <div>
            <Navbar />
          </div>
        )}
        <ProfileTabs />

      </div>
      <Routes>
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </>
  );
};

export default App;
