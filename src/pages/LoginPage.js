import React from 'react';
import './LoginSignup.scss';
import URLinkLogo from '../images/logo-urlink-full.png';
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
              <div className="subtitle">비밀번호</div>
              <PasswordInput placeholder="password" />

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