import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUser } from './redux/features/auth/authSlice';
import UserInfo from './components/UserInfo';
import Landing from './components/Landing';
import VerifyAccount from './components/VerifyAccount';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/NotFound';

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
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/users/:id" element={<UserInfo />} />
            <Route path="/auth/verify" element={<VerifyAccount />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}

    </div>
  );
};

export default App;
