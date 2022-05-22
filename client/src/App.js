import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUser } from './redux/features/auth/authSlice';
import UserInfo from './components/UserInfo';
import Navbar from './components/Navbar';
import Footer from './components/common/Footer';
import Landing from './components/Landing';

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
          </Routes>
          <Routes>
            <Route path="/users/:id" element={<UserInfo />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
