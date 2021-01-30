import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import LogoGoogle from '@images/logo-google.png';
import { userGregisterThunk } from '@modules/user';
import { useToast } from '@modules/ui';

function GregisterButton() {
  const disptach = useDispatch();
  const { openToast } = useToast();

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      await disptach(userGregisterThunk())
      window.location.href = '/index.html';
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' });
    }
  };

  return (
    <Button
      startIcon={<img className="logo-google" alt="URLink" src={LogoGoogle} />}
      className="btn-GoogleLogin"
      onClick={handleGoogleSignup}
    >
      구글 이메일로 회원가입
    </Button>
  );
}

export default GregisterButton;
