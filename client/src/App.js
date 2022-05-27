import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUser } from './redux/features/auth/authSlice';
import Profile from './components/Profile';
import Landing from './components/Landing';
import VerifyAccount from './components/VerifyAccount';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/NotFound';
import LoadingHome from './components/LoadingHome';

const App = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUser());
    document.title = 'Nova | Home';
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingHome />
      )
        : (
          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/users/:id" element={<Profile />} />
              <Route path="/auth/verify" element={<VerifyAccount />} />
              {
                user?.role === 'admin' && (
                  <Route path="/admin" element={<AdminDashboard />} />
                )
              }
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}

    </div>
  );
};

export default App;
