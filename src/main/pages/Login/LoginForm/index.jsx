import React from 'react'

import URLinkLogo from '@assets/images/logo-urlink-full.png'

import GloginButton from './GloginButton'
import NloginForm from './NloginForm'

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
  )
}

export default LoginForm
