import React from 'react'

import URLinkLogo from '@assets/images/logo-urlink-full.png'

import GregisterButton from './GregisterButton'
import NregisterForm from './NregisterForm'

function RegisterForm() {
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
  )
}

export default RegisterForm
