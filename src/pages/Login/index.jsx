import React from 'react';

import LoginFormBox from './LoginFormBox';

import '@assets/scss/LoginSignup.scss';

function Login() {
  return (
    <div className="container container-layout">
      <section className="main-layout">
        <LoginFormBox />
      </section>
      <section className="image-box image-layout"></section>
    </div>
  );
}

export default Login;
