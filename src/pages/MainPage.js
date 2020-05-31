import React from 'react'
import {Link, Router} from 'react-chrome-extension-router'

import URLinkLogo from '../images/logo-urlink-full.png'
import './LoginSignup.scss';

import SignupContainer from '../containers/SignupContainer'
import LoginContainer from '../containers/LoginContainer'
import CategoryContainer from '../containers/category/CategoryContainer';
import CategoryPage from './category/CategoryPage';

export default function MainPage() {
  return (
    <Router>
      <div className="container container-layout">
        <section className="login-box login-layout">
          <img className="logo-URLink" alt="URLink" src={URLinkLogo} />
          <div className="title-Main"><span className="bold">유어링크</span>로<br />흩어지는 정보를<br /> 쉽게 관리하세요.</div>
          <div className="button-list">
            <Link component={SignupContainer}>
              <div className="button-blue">
                회원가입
              </div>
            </Link>
            <Link component={LoginContainer}>
              <div className="button-white">
                로그인
              </div>
            </Link>
            {/* !! remove rquired*/}
            {/* <Link component={CategoryPage}>
              <div className="button-white">
                TEST 메인화면
              </div>
            </Link> */}
          </div>
        </section>
        <section className="image-box-signup image-layout">
        </section>
      </div>
    </Router>
  )
}