/* global chrome */
import React, {useState} from 'react';
import {Link} from "react-chrome-extension-router";
import {onClickGoogleSignup, onClickSignup} from '../containers/Signup'
import URLinkLogo from '../images/logo-urlink-full.png'
import checkTrue from '../images/check-true.png';
import checkFalse from '../images/check-false.png';
import { GoogleLoginBtn, AgreeBtn, /* SigninupBoxBtn , SigninupText,*/ TermsBtn } from '../components/button';
import { TermsModal } from '../components/modal';
import { IdInput, NicknameInput, PasswordInput  } from '../components/input';
import Button from '@material-ui/core/Button';
import './LoginSignup.scss';
import LoginPage from './LoginPage';

function SignupPage() {

  //terms modal
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({email,username,password});
      const check = await onClickSignup({email,username,password});
      if(check) alert("가입 완료 Hello world! ~~");
      else alert("가입 실패"); 
    } catch (error) {
      alert("가입 실패");
    }
  };

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
          <NicknameInput onChange={handleUserChange} placeholder="최대 8자" />
          <div className="check-idpw nickname-false">8자 이내로 작성해주세요.</div>

          <div className="subtitle">이메일</div>
          <IdInput onChange={handleEmailChange} placeholder="user@exmaple.com" />

          <div className="check-idpw id-true">
            <span><img src={checkTrue} alt="check true"></img></span>
            올바른 이메일 양식입니다.
          </div>

          <div className="check-idpw id-false">
            <span><img src={checkFalse} alt="check false"></img></span>
            올바르지 않은 이메일 양식입니다.
          </div>

          <div className="subtitle">비밀번호</div>
          <PasswordInput onChange={handlePasswordChange} placeholder="영문 + 숫자 조합 6자리 이상" />
          <div className="check-idpw pw-true">
            <span><img src={checkTrue} alt="check true"></img></span>
            올바른 비밀번호 양식입니다.
          </div>
          <div className="check-idpw pw-false">
            <span><img src={checkFalse} alt="check false"></img></span>
            올바르지 않은 비밀번호 양식입니다.
          </div>
          <PasswordInput placeholder="비밀번호 확인" />
          <div className="check-idpw pw-true">
            <span><img src={checkTrue} alt="check true"></img></span>
            올바른 비밀번호 양식입니다.
          </div>
          <div className="check-idpw pw-false">
            <span><img src={checkFalse} alt="check false"></img></span>
            비밀번호가 일치하지 않습니다.
          </div>

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

