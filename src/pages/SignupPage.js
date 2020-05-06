/* global chrome */
/* React & module*/
import React, {useState} from 'react';
import {Link} from "react-chrome-extension-router";
/* page */
import LoginPage from './LoginPage';
/* image */
import URLinkLogo from '../images/logo-urlink-full.png'
/* css */
import './LoginSignup.scss';
/* components */
import Button from '@material-ui/core/Button';
import {GoogleLoginBtn, AgreeBtn, TermsBtn} from '../components/button';
import {IdInput, NicknameInput, PasswordInput} from '../components/input';
import {TermsModal} from '../components/modal';
import {singupAlert, singupAlertCheck} from '../components/alert';
/* function */
import {onClickGoogleSignup, onClickSignup} from '../containers/Signup'

function SignupPage() {
  
  const [username,setUsername] = useState('');
  const [userAlert, setUserAlert] = useState(false);
  const [email,setEmail] = useState('');
  const [emailAlert, setEmailAlert] = useState(false);

  const [password,setPassword] = useState('');
  const [open,setOpen] = useState(false);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const check = await onClickSignup({email,username,password});
      if(check) alert("가입 완료 Hello world! ~~");
      else alert("가입 실패"); 
    } catch (error) {
      alert("가입 실패");
    }
  };

  const handleUserNameChange = (e) => {
    const name = e.target.value;
    setUsername(name);
    setUserAlert(singupAlertCheck.userName(name));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setEmailAlert(singupAlertCheck.email(email));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container container-layout">
      <section className="login-box login-layout">
        <img className="logo-URLink" alt="URLink" src={URLinkLogo} />
        <div className="title-login">회원가입</div>
        <GoogleLoginBtn text="구글 이메일로 회원가입" onClick={onClickGoogleSignup} />
        <div className="line"><span>OR</span></div>

        <form onSubmit={handleSubmit}>

          <div className="subtitle">닉네임</div>
          <NicknameInput onChange={handleUserNameChange} placeholder="최대 8자" />
          {userAlert ? singupAlert.userNameFalse() : ""}

          <div className="subtitle">이메일</div>
          <IdInput onChange={handleEmailChange} placeholder="user@exmaple.com" />
          {emailAlert ? singupAlert.emailFalse() : singupAlert.emailTrue()}

          <div className="subtitle">비밀번호</div>
          <PasswordInput onChange={handlePasswordChange} placeholder="영문 + 숫자 조합 6자리 이상" />
          <PasswordInput placeholder="비밀번호 확인" />

          <div className="agree-group">
            <AgreeBtn />
            <TermsBtn callback={handleClickOpen} />
            <TermsModal openBool={open} closeCallback={handleClose} clickCallback={handleClickOpen} />
          </div>

          <div className="btn-group">
            <Button type="submit" variant="contained" color="primary">
              회원가입
            </Button>
            <Link component={LoginPage}>
              <Button variant="text" color="primary">
                로그인
              </Button>
            </Link>
          </div>
        </form>
      </section>

      <section className="image-box-signup image-layout">
      </section>
    </div>
  );
}

export default SignupPage;