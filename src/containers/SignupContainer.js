/* global chrome */
import React, {useState} from 'react'
import auth from '../commons/apis/auth'
import userAPI from '../commons/apis/user'
import {AlertModal} from '../components/modal'
import SignupPage from '../pages/SignupPage'

export default function SignupContainer() {
  let retry = true
  const [modalText, setModalText] = useState('')

  const onClickSignup = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const email = data.get("email");
    const username = data.get("username")
    const password = data.get("password")
    const nRegister = userAPI.nRegister({ email, username, password })
    nRegister.then((res) => {
      auth.setAccessToken(res.data.token)
      setModalText("성공적으로 가입되었습니다!")
      window.location.href = "/index.html"
    })
    .catch((error) => {
      setModalText(error.response.data.message)
    })
  }

  const onClickGoogleSignup = e => {
    chrome.identity.getAuthToken({interactive: true}, token => {
      userAPI.gRegister(token)
        .then(res => {
          if (res.status >= 400 && retry) {
            retry = false
            return chrome.identity.removeCachedAuthToken({token}, onClickGoogleSignup)
          }
          else {
            auth.setAccessToken(res.data.token)
            setModalText("성공적으로 가입되었습니다!")
            window.location.href = "/index.html"
          }
        })
        .catch(error => {
          setModalText(error.response.data.message)
        })
    })
  }

  const onModalClose = e => {
    e.preventDefault()
    setModalText('')
  }

  const props = {
    onClickSignup,
    onClickGoogleSignup,
  }
  
  return (
    <>
      <SignupPage {...props}/>
      <AlertModal
        modalText={modalText}
        btnCreate="false" 
        openBool={modalText ? true: false} 
        onClose={onModalClose}
      />
    </>
  )
}