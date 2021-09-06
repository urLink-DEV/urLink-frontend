import React, { useCallback } from 'react'

import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'

import LogoGoogle from '@assets/images/logo-google.png'
import { useToast } from '@modules/ui'
import { userGloginThunk } from '@modules/user'

function GloginButton() {
  const dispatch = useDispatch()
  const { openToast } = useToast()

  const handleGoogleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await dispatch(userGloginThunk())
        window.location.href = '/index.html'
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [dispatch, openToast]
  )

  return (
    <Button
      startIcon={<img className="logo-google" alt="URLink" src={LogoGoogle} />}
      className="btn-GoogleLogin"
      onClick={handleGoogleLogin}
    >
      구글 이메일로 로그인
    </Button>
  )
}

export default GloginButton
