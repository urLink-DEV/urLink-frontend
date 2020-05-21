/* global chrome */
import React, {useState, useEffect} from 'react'
import {Link, Router} from 'react-chrome-extension-router'
import auth from './commons/apis/auth'
import Button from '@material-ui/core/Button'
import CategoryPage from './pages/category/CategoryPage'
import SignupContainer from './containers/SignupContainer'
import LoginContainer from './containers/LoginContainer'
import {CategoryContainer} from './containers/CategoryContainer'
import './App.scss'

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
      <br/>
      로그인을 하시면,
      <Link component={CategoryPage}>
        <Button variant='contained' color='primary'>
          메인화면
        </Button>
      </Link>
      으로 이동됩니다!
    </Router>
  )
}

function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    auth.tokenCheck()
      .then(res => {
        if (res) setLogin(true);
      })
      .catch(e => console.log(e))
  }, []);

  return (
    login
      ? <Router>
          <Link component={CategoryPage}>
            <Button variant='contained' color='primary'>
            메인화면
            </Button>
          </Link>
          <Link component={CategoryContainer}>
            <Button variant='contained' color='primary'>
             수정중
            </Button>
          </Link>
        </Router>
      : <InitMain></InitMain>
  )
}

export default App;