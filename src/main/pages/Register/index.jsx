import React from 'react'

import '@assets/scss/LoginSignup.scss'

import RegisterForm from './RegisterForm'

function Register() {
  return (
    <div className="container container-layout">
      <section className="main-layout">
        <RegisterForm />
      </section>
      <section className="image-box image-layout"></section>
    </div>
  )
}

export default Register
