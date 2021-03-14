import React from 'react'

import '@assets/scss/LoginSignup.scss'

import LoginForm from './LoginForm'

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
