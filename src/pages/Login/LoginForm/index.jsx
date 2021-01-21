import React from 'react';
import NloginForm from './NloginForm';
import GloginButton from './GloginButton';
import URLinkLogo from '@images/logo-urlink-full.png';

function LoginForm() {
  return (
    <div className="box">
      <img className="logo-URLink" alt="urLink logo" src={URLinkLogo} />
      <div className="title">로그인</div>
      <GloginButton />
      <div className="line">
        <span>OR</span>
      </div>
      <NloginForm />
    </div>
  );
}

export default LoginForm;
