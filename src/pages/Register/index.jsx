import React from 'react';
import RegisterForm from './RegisterForm';
import '@assets/scss/LoginSignup.scss';

function Register() {
  return (
    <div className="container container-layout">
      <section className="main-layout">
        <RegisterForm />
      </section>
      <section className="image-box image-layout"></section>
    </div>
  );
}

export default Register;
