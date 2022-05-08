import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.user);

  return <div>{user ? 'Logged In' : 'Not Logged In'}</div>;
}

export default App;
