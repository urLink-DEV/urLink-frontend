import React, {useReducer} from 'react'
import {Link} from 'react-chrome-extension-router'
import SignupContainer from '../containers/SignupContainer'
import URLinkLogo from '../images/logo-urlink-full.png'
import { GoogleLoginBtn } from '../components/button'
import { IdInput, PasswordInput } from '../components/input'
import Button from '@material-ui/core/Button'
import './LoginSignup.scss'

function LoginPage(props) {

  /**
   * * props setting
   */
  const {onClickGoogleLogin, onClickLogin} = props
  
  /**
   * * state setting
   */
  // * formState
  const formStateInit = {
    email: "",
    password: ""
  }
  const reducer = (formState, { field, value }) => {
    return {
      ...formState,
      [field]: value
    }
  }
  const [formState, dispatch] = useReducer(reducer, formStateInit)
  const { email, password } = formState

  /**
   * * listener
   */
  const onChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    dispatch({ field, value })
  }
  
  const btnActive = () => {
    return !(!!email) || !(!!password)
  }

  return (
    <div className="container container-layout">
      <section className="login-box login-layout">
        <img className="logo-URLink" alt="URLink" src={URLinkLogo} />
        <div className="title-login">
          로그인
        </div>
        <form onSubmit={onClickLogin}>
          <GoogleLoginBtn onClick={onClickGoogleLogin} text="구글 이메일로 로그인" />
          <div className="line">
            <span>
              OR
            </span>
          </div>
          <div className="subtitle">
            이메일
          </div>
          <IdInput name="email" onChange={onChange} placeholder="user@exmaple.com" />
          <div className="subtitle">
            비밀번호
          </div>
          <PasswordInput name="password"
            onChange={onChange}
            placeholder="password" 
          />
          <div className="btn-group">
            <Button disabled={btnActive()} 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              로그인
            </Button>
            <Link component={SignupContainer}>
              <Button variant="text" color="primary">
                회원가입
              </Button>
            </Link>
          </div>
        </form>
      </section>
      <section className="image-box-login image-layout">
      </section>
    </div>
  )
}

export default LoginPage