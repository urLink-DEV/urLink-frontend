import React from 'react';

import NregisterForm from './NregisterForm';
import GregisterButton from './GregisterButton';

import URLinkLogo from '@images/logo-urlink-full.png';

function RegisterFormBox() {
  return (
    <div className="box">
      <img className="logo-URLink" alt="urLink logo" src={URLinkLogo} />
      <div className="title">회원가입</div>
      <GregisterButton />
      <div className="line">
        <span>OR</span>
      </div>
      <NregisterForm />
    </div>
  );
}

export default RegisterFormBox;
