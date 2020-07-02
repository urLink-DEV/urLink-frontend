import React, {useState, useEffect} from 'react'
import { Link } from 'react-chrome-extension-router'

import LogoGoogle from '../images/logo-google.png'
import URLinkLogo from '../images/logo-urlink-full.png'
import './styles/LoginSignup.scss'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import { TermsModal } from '../components/modal'
import MsgAlert from '../components/MsgAlert'

import LoginContainer from '../containers/LoginContainer'

import singupAlertCheck from '../commons/validation/register'

function SignupPage(props) {
  const { onClickSignup, onClickGoogleSignup } = props

  const [formInfo, setFormInfo] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: ""
  })
  const [usernameAlert, setUsernameAlert] = useState({ msg: '', check: true })
  const [emailAlert, setEmailAlert] = useState({ msg: '', check: true })
  const [passwordAlert, setPasswordAlert] = useState({ msg: '', check: true })
  const [rePasswordAlert, setRePasswordAlert] = useState({ msg: '', check: true })
  const [registerCheck, setRegisterCheck] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const onChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    setFormInfo({
      ...formInfo,
      [field]: value
    })
  }

  useEffect(() => {
    const validationCheck = {
      username: function (formInfo) {
        const { username } = formInfo
        const { msg, check } = singupAlertCheck.username(username)
        setUsernameAlert({ msg, check })
      },
      email: function (formInfo) {
        const { email } = formInfo
        const { msg, check } = singupAlertCheck.email(email)
        setEmailAlert({ msg, check })
      },
      password: function (formInfo) {
        const { password } = formInfo
        const { msg, check } = singupAlertCheck.password(password)
        setPasswordAlert({ msg, check })
      },
      rePassword: function (formInfo) {
        const { password, rePassword } = formInfo
        const { msg, check } = singupAlertCheck.rePassword(password, rePassword)
        setRePasswordAlert({ msg, check })
      }
    }

    Object.keys(formInfo).forEach((field) => {
      validationCheck[field](formInfo)
    })
  }, [formInfo])

  const changeRegisterCheck = () => {
    setRegisterCheck(!registerCheck)
  }

  const handleRegisterCheck = (e) => {
    const check = parseInt(e.currentTarget.value);
    setRegisterCheck(check ? true : false);
    setRegisterModalOpen(false);
  }

  const handleClickTermsOpen = () => {
    setRegisterModalOpen(true)
  }

  const handleClickTermsClose = () => {
    setRegisterModalOpen(false)
  }

  const btnActive = () => {
    return usernameAlert.check || emailAlert.check || passwordAlert.check || rePasswordAlert.check || !registerCheck
  }
  
  return (
    <div className="container container-layout">
      <section className="login-box login-layout">
        <img className="logo-URLink" alt="URLink" src={URLinkLogo} />
        <div className="title">회원가입</div>
        <Button className="btn-GoogleLogin" onClick={onClickGoogleSignup} >
          <img className="logo-google" alt="URLink" src={LogoGoogle} />
          구글 이메일로 회원가입
        </Button>
        <div className="line"><span>OR</span></div>

        <form onSubmit={onClickSignup}>
          <h2 className="subtitle">닉네임</h2>
          <input className="input" type="text" name="username" onChange={onChange} placeholder="최대 8자"/>
          <MsgAlert msg={usernameAlert.msg} check={usernameAlert.check}/>

          <h2 className="subtitle">이메일</h2>
          <input className="input" type="text" name="email" onChange={onChange} placeholder="user@exmaple.com"/>
          <MsgAlert msg={emailAlert.msg} check={emailAlert.check}/>

          <h2 className="subtitle">비밀번호</h2>
          <input className="input" type="password" name="password" onChange={onChange} placeholder="영문 + 숫자 조합 6자리 이상"/>
          <MsgAlert msg={passwordAlert.msg} check={passwordAlert.check}/>

          <input className="input" type="password" name="rePassword" onChange={onChange} placeholder="비밀번호 확인"/>
          <MsgAlert msg={rePasswordAlert.msg} check={rePasswordAlert.check}/>

          <div className="agree-group">
            <FormControlLabel
              value="이용약관 동의"
              label="이용약관 동의"
              className="text-agree"
              control={<Radio color="primary" checked={registerCheck} onClick={changeRegisterCheck} />}
            />
            <Button variant="outlined" color="primary" onClick={handleClickTermsOpen}>약관보기</Button>
            <TermsModal openBool={registerModalOpen} onClose={handleClickTermsClose} onClick={handleRegisterCheck}/>
          </div>

          <div className="btn-group">
            <Button disabled={btnActive()} type="submit" variant="contained" color="primary">
              회원가입
            </Button>
            <Link className="link" component={LoginContainer}>
              <Button variant="text" color="primary">
                로그인
              </Button>
            </Link>
          </div>
        </form>
      </section>
      
      <section className="image-box-signup image-layout"></section>
    </div>
  );
}

export default SignupPage;