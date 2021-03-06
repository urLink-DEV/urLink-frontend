import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import LogoGoogle from '@images/logo-google.png';
import { userGloginThunk } from '@modules/user';
import { useToast } from '@modules/ui';

function GloginButton() {
  const dispatch = useDispatch();
  const { openToast } = useToast();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(userGloginThunk());
      window.location.href = '/index.html';
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' });
    }
  };

  return (
    <Button
      startIcon={<img className="logo-google" alt="URLink" src={LogoGoogle} />}
      className="btn-GoogleLogin"
      onClick={handleGoogleLogin}
    >
      구글 이메일로 로그인
    </Button>
  );
}

export default GloginButton;
