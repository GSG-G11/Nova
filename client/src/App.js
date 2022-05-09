import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { SignupModal } from './components/Forms';
import { checkUser } from './redux/features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="App">
      <SignupModal />
      {loading ? 'Loading...' : (
        <div>
          {user ? (
            <div>
              <h1>
                Welcome,
                {' '}
                {user}
              </h1>
            </div>
          ) : (
            <div>
              <h1>Please login</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default App;
