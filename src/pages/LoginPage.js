import React, { useState } from 'react'
import { Link } from 'react-chrome-extension-router'

import LogoGoogle from '../images/logo-google.png';
import URLinkLogo from '../images/logo-urlink-full.png'
import Button from '@material-ui/core/Button'
import './styles/LoginSignup.scss'

import SignupContainer from '../containers/SignupContainer'

function LoginPage(props) {
  const { onClickGoogleLogin, onClickLogin } = props
  
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: ""
  })

  const onChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    setFormInfo({
      ...formInfo,
      [field]: value
    })
  }

  const btnActive = () => {
    return !(!!formInfo.email) || !(!!formInfo.password)
  }

  return (
    <div className="container container-layout">
      <section className="login-box login-layout">
        <img className="logo-URLink" alt="URLink" src={URLinkLogo} />
        <div className="title">로그인</div>
        <form onSubmit={onClickLogin}>
          <Button className="btn-GoogleLogin" onClick={onClickGoogleLogin} >
            <img className="logo-google" alt="URLink" src={LogoGoogle} />
            구글 이메일로 로그인
          </Button>
          <div className="line"><span>OR</span></div>

          <h2 className="subtitle">이메일</h2>
          <input className="input" type="text" name="email" onChange={onChange} placeholder="user@exmaple.com" />
          <h2 className="subtitle">비밀번호</h2>
          <input className="input" type="password" name="password" onChange={onChange} placeholder="password" />
          <div className="btn-group">
            <Button disabled={btnActive()} type="submit" variant="contained" color="primary">
              로그인
            </Button>
            <Link className="link" component={SignupContainer}>
              <Button variant="text" color="primary">
                회원가입
              </Button>
            </Link>
          </div>
        </form>
      </section>
      
      <section className="image-box-login image-layout"></section>
    </div>
  )
}

export default LoginPage