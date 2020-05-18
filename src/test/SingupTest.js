/* global chrome */
import React, {useState,useReducer} from 'react';
import {Link} from "react-chrome-extension-router";
import URLinkLogo from '../images/logo-urlink-full.png'
import './LoginSignup.scss';
import Button from '@material-ui/core/Button';
import {GoogleLoginBtn, OneRadioBtn, NomalBtn} from '../components/button';
import {IdInput, NicknameInput, PasswordInput} from '../components/input';
import {TermsModal} from '../components/modal';
import {singupAlert, singupAlertCheck} from '../components/alert';
import LoginContainer from '../containers/LoginContainer';

function SignupPage(props) {

  // * props setting
  const {onClickSignup, onClickGoogleSignup} = props;

  // * username
  const [usernameAlertMsg,setUsernameAlertMsg] = useState('');
  const [usernameAlert, setUsernameAlert] = useState(true);
  //* email
  const [email,setEmail] = useState('');
  const [emailAlertMsg,setEmailAlertMsg] = useState('');
  const [emailAlert,setEmailAlert] = useState(true);
  // * password
  const [password,setPassword] = useState('');
  const [passwordAlertMsg,setPasswordAlertMsg] = useState('');
  const [passwordAlert,setPasswordAlert] = useState(true);
  // * rePassword
  const [rePassword,setRePassword] = useState('');
  const [rePasswordAlertMsg,setRePasswordAlertMsg] = useState('');
  const [rePasswordAlert,setRePasswordAlert] = useState(true);
  // * register access check Button
  const [registerCheck, setRegisterCheck] = useState(false);
  const [registerModalOpen,setRegisterModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if(usernameAlert || emailAlert || passwordAlert || rePasswordAlert || !registerCheck) {
        if(usernameAlert) alert("[닉네임] 체크가 안되어 있습니다.");
        else if(emailAlert) alert("[이메일] 체크가 안되어 있습니다.");
        else if(passwordAlert) alert("[비밀번호] 체크가 안되어 있습니다.");
        else if(rePasswordAlert) alert("[비밀번호 확인] 체크가 안되어 있습니다.");
        else if(!registerCheck) alert("[이용약관 동의] 체크가 안되어 있습니다.");
        return false;
      }
      const resultSingup = await onClickSignup({email,username,password});
      console.log(resultSingup);      
      if(resultSingup.check) {
        alert("가입 완료 Hello world! ~~");
      }
      else alert("가입 실패"); 
    } catch (error) {
      console.log(error);      
      alert("가입 실패"); 
    }
  };

  const handleUserNameChange = (e) => {
    const name = e.target.value;
    const resultAlert = singupAlertCheck.userName(name);
    setUsername(name);
    setUsernameAlert(resultAlert.check);
    setUsernameAlertMsg(resultAlert.msg);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const resultAlert = singupAlertCheck.email(email);
    setEmail(email);
    setEmailAlert(resultAlert.check);
    setEmailAlertMsg(resultAlert.msg);
  };
  
  const checkPw = (password,rePassword) => {
    if(!password || !rePassword) return;
    const resultAlert = singupAlertCheck.rePassword(password,rePassword);
    setRePasswordAlert(resultAlert.check);
    setRePasswordAlertMsg(resultAlert.msg);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const resultAlert = singupAlertCheck.password(password);
    setPassword(password);
    setPasswordAlert(resultAlert.check);
    setPasswordAlertMsg(resultAlert.msg);
    checkPw(password, rePassword);
  };

  const handleRePasswordChange = (e) => {
    const rePassword = e.target.value;
    setRePassword(rePassword);
    checkPw(password,rePassword);
  };

  const changeRegisterCheck = () => {
    setRegisterCheck(registerCheck => !registerCheck);
  };

  const handleRegisterCheck = (e) => {
    const check = parseInt(e.currentTarget.value);
    setRegisterCheck(check ? true: false);
    setRegisterModalOpen(false);
  };

  const handleClickTermsOpen = () => {
    setRegisterModalOpen(true);
  };

  const handleClickTermsClose = () => {
    setRegisterModalOpen(false);
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
          <NicknameInput name="username" onChange={onChange} value={username} placeholder="최대 8자" />
          {username && usernameAlert ? singupAlert.UserNameFalse(usernameAlertMsg) : ""}

          <div className="subtitle">이메일</div>
          <IdInput onChange={handleEmailChange} placeholder="user@exmaple.com" />
          {email && emailAlert ? singupAlert.EmailFalse(emailAlertMsg) : (email ? singupAlert.EmailTrue(emailAlertMsg) : "")}

          <div className="subtitle">비밀번호</div>
          <PasswordInput onChange={handlePasswordChange} placeholder="영문 + 숫자 + 특수문자 조합 6자리 이상" />
          {password && passwordAlert ? singupAlert.PasswordFalse(passwordAlertMsg) : (password ? singupAlert.PasswordTrue(passwordAlertMsg) : "")}

          <PasswordInput onChange={handleRePasswordChange} placeholder="비밀번호 확인" />
          {rePassword && rePasswordAlert ? singupAlert.PasswordFalse(rePasswordAlertMsg) : (rePassword ? singupAlert.PasswordTrue(rePasswordAlertMsg) : "")}

          <div className="agree-group">
            <OneRadioBtn text={"이용약관 동의"} checked={registerCheck} onClick={changeRegisterCheck} />
            <NomalBtn text={"약관보기"} onClick={handleClickTermsOpen} />
            <TermsModal openBool={registerModalOpen} onClose={handleClickTermsClose} onClick={handleRegisterCheck} />
          </div>

          <div className="btn-group">
            <Button type="submit" variant="contained" color="primary">
              회원가입
            </Button>
            <Link component={LoginContainer}>
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