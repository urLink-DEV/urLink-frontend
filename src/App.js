import React from 'react';
import Login from './containers/Login';
import GoogleLogin from './containers/GoogleLogin';
import './App.scss';

function App() {
  return (
    <div className={'app'}>
      hello URLink
      <Login />
      <GoogleLogin />
    </div>
  );
}

export default App;
