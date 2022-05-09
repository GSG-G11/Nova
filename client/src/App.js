import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from './redux/features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div className="App">
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
