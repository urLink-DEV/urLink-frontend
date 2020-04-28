import React from 'react';
import './LoginSignup.scss';
import URLinkLogo from '../images/logo-urlink-full.png';
import checkTrue from '../images/check-true.png';
import checkFalse from '../images/check-false.png';
import { GoogleLoginBtn, SigninupBoxBtn, SigninupText } from '../components/button';
import { IdInput, PasswordInput } from '../components/input';


function LoginPage() {
  return (
    <div className="container container-layout">
        <section className="login-box login-layout">
            <img className="logo-URLink" alt="URLink" src={URLinkLogo} />
            <div className="title-login">로그인</div>

            <form method="POST">

              <GoogleLoginBtn text="구글 이메일로 로그인" />
              <div className="line"><span>OR</span></div>

              <div className="subtitle">이메일</div>
              <IdInput placeholder="user@exmaple.com" />
              <div className="check-idpw id-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                올바른 이메일 양식입니다.</div>
              <div className="check-idpw id-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                올바르지 않은 이메일 양식입니다.</div>
                
              <div className="subtitle">비밀번호</div>
              <PasswordInput placeholder="password" />
              <div className="check-idpw pw-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                올바른 비밀번호 양식입니다.</div>
              <div className="check-idpw pw-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                올바르지 않은 비밀번호 양식입니다.</div>

              <div className="btn-group">
                <SigninupBoxBtn text="로그인"/>
                <SigninupText text="회원가입" />
              </div>

            </form>
        </section>

        <section className="image-box-login image-layout">
        </section>
    </div>
  );
}
export default LoginPage;