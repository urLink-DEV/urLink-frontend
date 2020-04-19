import React from 'react';
import './LoginSignup.scss';
import URLinkLogo from '../images/logo-urlink-full.png'
import checkTrue from '../images/check-true.png';
import checkFalse from '../images/check-false.png';
import { GoogleLoginBtn, AgreeBtn, SigninupBoxBtn, SigninupText, TermsBtn } from '../components/button';
import { TermsModal } from '../components/modal';
import { IdInput, NicknameInput, PasswordInput  } from '../components/input';


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
              <NicknameInput placeholder="최대 8자" />
              <div className="check-idpw nickname-false">8자 이내로 작성해주세요.</div>

              <div className="subtitle">이메일</div>
              <IdInput placeholder="user@exmaple.com" />
              <div className="check-idpw id-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                올바른 이메일 양식입니다.</div>
              <div className="check-idpw id-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                올바르지 않은 이메일 양식입니다.</div>

              <div className="subtitle">비밀번호</div>
              <PasswordInput placeholder="영문 + 숫자 조합 6자리 이상" />
              <div className="check-idpw pw-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                올바른 비밀번호 양식입니다.</div>
              <div className="check-idpw pw-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                올바르지 않은 비밀번호 양식입니다.</div>
                
              <PasswordInput placeholder="비밀번호 확인" />
              <div className="check-idpw pw-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                올바른 비밀번호 양식입니다.</div>
              <div className="check-idpw pw-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                비밀번호가 일치하지 않습니다.</div>

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

