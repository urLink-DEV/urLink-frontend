import React from 'react';

import RegisterFormBox from './RegisterFormBox';

import '@assets/scss/LoginSignup.scss';

function Signup() {
  return (
    <div className="container container-layout">
      <section className="main-layout">
        <RegisterFormBox />
      </section>
      <section className="image-box image-layout"></section>
    </div>
  );
}

export default Signup;
