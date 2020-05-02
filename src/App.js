/* global chrome */
import React, {useState} from 'react';
import {Link, Router} from "react-chrome-extension-router";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Button from '@material-ui/core/Button'
import './App.scss';
import CategoryPage from './pages/CategoryPage';

function InitMain() {
  return (
    <Router>
    안녕하세요! urLink 계정을 이미 가지고 계시다면,
      <Link component={LoginPage}>
        <Button variant='contained' color='primary'>
          로그인
        </Button>
      </Link>

      처음 회원이시라면,
      <Link component={SignupPage}>
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

  

  return (
    authState 
      ? <CategoryPage></CategoryPage>
      : <InitMain></InitMain>
  );
}

export default App;
