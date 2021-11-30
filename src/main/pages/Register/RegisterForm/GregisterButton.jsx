import React, { useCallback } from 'react'

import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'

import { GAEvent } from '@/utils/ga'
import LogoGoogle from '@assets/images/logo-google.png'
import { useToast } from '@modules/ui'
import { userGregisterThunk } from '@modules/user'

function GregisterButton() {
  const dispatch = useDispatch()
  const { openToast } = useToast()

  const handleGoogleSignup = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        GAEvent('회원가입', '구글 회원가입')
        await dispatch(userGregisterThunk())
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
      onClick={handleGoogleSignup}
    >
      구글 이메일로 회원가입
    </Button>
  )
}

export default GregisterButton
