import React from 'react';
import './LoginSignup.scss';
import URLinkLogo from '../images/logo-urlink-full.png'
import { GoogleLoginBtn, AgreeBtn, SigninupBoxBtn, SigninupText, TermsBtn } from '../components/button';
import { TermsModal } from '../components/modal';
import { IdInput, PasswordInput  } from '../components/input';


function SignupPage() {

  //terms modal
  const [open, setOpen] = React.useState(false);
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

            <form method="POST">

              <GoogleLoginBtn text="구글 이메일로 회원가입" />
              <div className="line"><span>OR</span></div>
              <div className="subtitle">닉네임</div>
              <IdInput placeholder="최대 8자" />
              <div className="subtitle">이메일</div>
              <IdInput placeholder="user@exmaple.com" />
              <div className="subtitle">비밀번호</div>
              <PasswordInput placeholder="영문 + 숫자 조합 6자리 이상" />
              <PasswordInput placeholder="비밀번호 확인" />

              <div className="agree-group">
                <AgreeBtn />
                <TermsBtn callback={handleClickOpen}/>
                <TermsModal openBool={open} closeCallback={handleClose} clickCallback={handleClickOpen} />
              </div>

              <div className="btn-group">
                <SigninupBoxBtn text="회원가입"/>
                <SigninupText text="< 로그인" />
              </div>

            </form>
        </section>

        <section className="image-box-signup image-layout">
        </section>
    </div>
  );
}
export default SignupPage;

