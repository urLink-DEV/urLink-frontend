/* global chrome */
import React, {useState} from 'react';
import {Link, Router} from "react-chrome-extension-router";
import Button from '@material-ui/core/Button'
import CategoryPage from './pages/CategoryPage';
import LoginTest from './test/LoginTest';
import auth from './commons/auth';
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import './App.scss';

function InitMain() {
  return (
    <Router>
    안녕하세요! urLink 계정을 이미 가지고 계시다면,
      <Link component={LoginContainer}>
        <Button variant='contained' color='primary'>
          로그인
        </Button>
      </Link>

      처음 회원이시라면,
      <Link component={SignupContainer}>
        <Button variant='contained' color='primary'>
          회원가입
        </Button>
      </Link>
      을 해주세요!
    </Router>
  )
}

function App() {

  const [authState, setAuthState] = useState(false);
  
  (async () => {
    try {
      const authCheck = await auth.tokenCheck();
      setAuthState(!authCheck);
    } catch (error) {
      setAuthState(false);
    }
  })();


  return (
    authState 
      ? <CategoryPage></CategoryPage>
      : <InitMain></InitMain>
  );
}

export default App;
