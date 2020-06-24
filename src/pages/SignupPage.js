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

  /** 
   * * props setting
   */
  const {onClickSignup, onClickGoogleSignup} = props;
  
  /**
   * * state setting
   */
  // * formState
  const formStateInit = {
    username: "",
    email: "",
    password: "",
    rePassword: ""
  };
  const reducer = (formState, { field, value }) => {
    return {
      ...formState,
      [field]: value
    }
  };
  const [formState, dispatch] = useReducer(reducer, formStateInit);
  const { username, email, password, rePassword } = formState;
  // * usernameAlert
  const [usernameAlertMsg, setUsernameAlertMsg] = useState('');
  const [usernameAlert, setUsernameAlert] = useState(true);
  //* emailAlert
  const [emailAlertMsg, setEmailAlertMsg] = useState('');
  const [emailAlert, setEmailAlert] = useState(true);
  // * passwordAlert
  const [passwordAlertMsg, setPasswordAlertMsg] = useState('');
  const [passwordAlert, setPasswordAlert] = useState(true);
  // * rePasswordAlert
  const [rePasswordAlertMsg, setRePasswordAlertMsg] = useState('');
  const [rePasswordAlert, setRePasswordAlert] = useState(true);
  // * register access check Button
  const [registerCheck, setRegisterCheck] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const onChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch({ field, value });
    if(validationCheck.hasOwnProperty([field + "Check"])) validationCheck[field + "Check"](value,formState);
  };
  const validationCheck = {
    usernameCheck: function (name,_formState) {
      const resultAlert = singupAlertCheck.username(name);
      setUsernameAlert(resultAlert.check);
      setUsernameAlertMsg(resultAlert.msg);
    },
    emailCheck: function (email,_formState) {
      const resultAlert = singupAlertCheck.email(email);
      setEmailAlert(resultAlert.check);
      setEmailAlertMsg(resultAlert.msg);
    },
    checkPw: function (password,rePassword) {
      if (!password || !rePassword) return;
      const resultAlert = singupAlertCheck.rePassword(password, rePassword);
      setRePasswordAlert(resultAlert.check);
      setRePasswordAlertMsg(resultAlert.msg);
    },
    passwordCheck: function (password,formState) {
      const resultAlert = singupAlertCheck.password(password);
      setPasswordAlert(resultAlert.check);
      setPasswordAlertMsg(resultAlert.msg);
      this.checkPw(password, formState.rePassword);
    },
    rePasswordCheck: function (rePassword,formState) {
      this.checkPw(formState.password, rePassword);
    }
  };
  const changeRegisterCheck = () => {
    setRegisterCheck(registerCheck => !registerCheck);
  };
  const handleRegisterCheck = (e) => {
    const check = parseInt(e.currentTarget.value);
    setRegisterCheck(check ? true : false);
    setRegisterModalOpen(false);
  };
  const handleClickTermsOpen = () => {
    setRegisterModalOpen(true);
  };
  const handleClickTermsClose = () => {
    setRegisterModalOpen(false);
  };
  const btnActive = () => {
    return usernameAlert || emailAlert || passwordAlert || rePasswordAlert || !registerCheck
  };
  
  return (
    <div className="container container-layout">
      <section className="login-box login-layout">
        <img className="logo-URLink" alt="URLink" src={URLinkLogo} />
        <div className="title-login">회원가입</div>
        <GoogleLoginBtn text="구글 이메일로 회원가입" onClick={onClickGoogleSignup} />
        <div className="line"><span>OR</span></div>

        <form onSubmit={onClickSignup}>
          <div className="subtitle">닉네임</div>
          <NicknameInput name="username" onChange={onChange} placeholder="최대 8자" />
          {username && usernameAlert ? singupAlert.UserNameFalse(usernameAlertMsg) : ""}

          <div className="subtitle">이메일</div>
          <IdInput name="email" onChange={onChange} placeholder="user@exmaple.com" />
          {email && emailAlert ? singupAlert.EmailFalse(emailAlertMsg) : (email ? singupAlert.EmailTrue(emailAlertMsg) : "")}

          <div className="subtitle">비밀번호</div>
          <PasswordInput name="password" onChange={onChange} placeholder="영문 + 숫자 + 특수문자 조합 8자리 이상" />
          {password && passwordAlert ? singupAlert.PasswordFalse(passwordAlertMsg) : (password ? singupAlert.PasswordTrue(passwordAlertMsg) : "")}

          <PasswordInput name="rePassword" onChange={onChange} placeholder="비밀번호 확인" />
          {rePassword && rePasswordAlert ? singupAlert.PasswordFalse(rePasswordAlertMsg) : (rePassword ? singupAlert.PasswordTrue(rePasswordAlertMsg) : "")}

          <div className="agree-group">
            <OneRadioBtn text={"이용약관 동의"} checked={registerCheck} onClick={changeRegisterCheck} />
            <NomalBtn text={"약관보기"} onClick={handleClickTermsOpen} />
            <TermsModal openBool={registerModalOpen} onClose={handleClickTermsClose} onClick={handleRegisterCheck} />
          </div>

          <div className="btn-group">
            <Button disabled={btnActive()} type="submit" variant="contained" color="primary">
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