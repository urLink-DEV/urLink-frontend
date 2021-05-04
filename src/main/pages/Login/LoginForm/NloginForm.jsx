import React, { useCallback } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-ui/core'
import { Link } from 'react-chrome-extension-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import ValidationMessage from '@main/components/ValidationMessage'
import Register from '@main/pages/Register'
import { useToast } from '@modules/ui'
import { userLoginThunk } from '@modules/user'

const SCHEMA = yup.object().shape({
  email: yup.string().required('이메일은 필수 입력입니다.'),
  password: yup.string().required('비밀번호는 필수 입력입니다.'),
})

function NloginForm() {
  const dispatch = useDispatch()
  const { openToast } = useToast()
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(SCHEMA),
  })

  const handleLogin = useCallback(
    async (formData) => {
      try {
        await dispatch(userLoginThunk(formData))
        window.location.href = '/index.html'
      } catch (error) {
        openToast({ type: 'error', message: error.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [dispatch, openToast]
  )

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      {/* 이메일 */}
      <div className="form-group">
        <label className="subtitle" htmlFor="email">
          이메일
        </label>
        <input id="email" className="input" name="email" ref={register} placeholder="user@exmaple.com" />
        {!!errors.email && <ValidationMessage msg={errors?.email?.message} check={!!errors.email} />}
      </div>

      {/* 비밀번호 */}
      <div className="form-group">
        <label className="subtitle" htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          className="input"
          type="password"
          name="password"
          ref={register}
          placeholder="영문 + 숫자 조합 6자리 이상"
        />
        {!!errors.password && <ValidationMessage msg={errors?.password?.message} check={!!errors.password} />}
      </div>

      {/* 회원가입 | 로그인 */}
      <div className="btn-group">
        <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid}>
          로그인
        </Button>
        <Link className="link" component={Register}>
          <Button variant="text" color="primary">
            회원가입
          </Button>
        </Link>
      </div>
    </form>
  )
}

export default NloginForm
