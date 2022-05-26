import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUser } from './redux/features/auth/authSlice';
import UserInfo from './components/UserInfo';
import Landing from './components/Landing';
import VerifyAccount from './components/VerifyAccount';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/NotFound';
import LoadingHome from './components/LoadingHome';

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    dispatch(checkUser());
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingHome />
      )
        : (
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
