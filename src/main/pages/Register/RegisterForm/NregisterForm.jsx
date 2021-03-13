import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormControlLabel, Button, Checkbox } from '@material-ui/core'
import { Link } from 'react-chrome-extension-router'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import { TermsModal } from '@main/components/modals'
import ValidationMessage from '@main/components/ValidationMessage'
import Login from '@main/pages/Login'
import { useToast } from '@modules/ui'
import { userRegisterThunk } from '@modules/user'

const SCHEMA = yup.object().shape({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  username: yup.string().max(8, '8자 이내로 작성해주세요.').required('닉네임은 필수 입력입니다.'),
  password: yup
    .string()
    .matches(/[a-zA-Z]/gi, {
      message: '영문,숫자를 혼합하여 입력해야 합니다.',
    })
    .matches(/[0-9]/g, {
      message: '영문,숫자를 혼합하여 입력해야 합니다.',
    })
    .required('비밀번호는 필수 입력입니다.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력입니다.'),
  registerCheck: yup.boolean().oneOf([true], '이용약관 동의가 필요 합니다.'),
})

function NregisterForm() {
  const disptach = useDispatch()
  const { openToast } = useToast()
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const { register, handleSubmit, setValue, errors, control, formState } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      registerCheck: false,
    },
    mode: 'onChange',
    resolver: yupResolver(SCHEMA),
  })

  const handleSignup = async (formData) => {
    try {
      await disptach(userRegisterThunk(formData))
      window.location.href = '/index.html'
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      {/* 닉네임 */}
      <div className="form-group">
        <label className="subtitle" htmlFor="usernamesd">
          닉네임
        </label>
        <input id="usernamesd" className="input" name="username" ref={register} placeholder="최대 8자" />
        {!!errors.username && <ValidationMessage msg={errors?.username?.message} check={!!errors.username} />}
      </div>

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

      {/* 비밀번호 확인 */}
      <div className="form-group">
        <label className="subtitle" htmlFor="passwordConfirm">
          비밀번호 확인
        </label>
        <input id="passwordConfirm" className="input" type="password" name="passwordConfirm" ref={register} />
        {!!errors.passwordConfirm && (
          <ValidationMessage msg={errors?.passwordConfirm?.message} check={!!errors.passwordConfirm} />
        )}
      </div>

      {/* 이용약관 동의 */}
      <div className="agree-group">
        <FormControlLabel
          label="이용약관 동의"
          className="text-agree"
          control={
            <Controller
              name="registerCheck"
              control={control}
              render={({ value, onChange }) => (
                <Checkbox color="primary" onChange={(e) => onChange(!value)} checked={value} value={value} />
              )}
            />
          }
        />
        <Button variant="outlined" color="primary" onClick={() => setRegisterModalOpen(true)}>
          약관보기
        </Button>
        <TermsModal
          open={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          onYesClick={() => {
            setValue('registerCheck', true)
            setRegisterModalOpen(false)
          }}
          onNoClick={() => {
            setValue('registerCheck', false)
            setRegisterModalOpen(false)
          }}
        />
      </div>
      {!!errors.registerCheck && (
        <ValidationMessage msg={errors?.registerCheck?.message} check={!!errors.registerCheck} />
      )}

      {/* 회원가입 | 로그인 */}
      <div className="btn-group">
        <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid}>
          회원가입
        </Button>
        <Link className="link" component={Login}>
          <Button variant="text" color="primary">
            로그인
          </Button>
        </Link>
      </div>
    </form>
  )
}

export default NregisterForm
