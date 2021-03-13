import React from 'react'

import LoginForm from './LoginForm'
import '@assets/scss/LoginSignup.scss'

function Login() {
  return (
    <div className="container container-layout">
      <section className="main-layout">
        <LoginForm />
      </section>
      <section className="image-box image-layout"></section>
    </div>
  )
}

export default Login
