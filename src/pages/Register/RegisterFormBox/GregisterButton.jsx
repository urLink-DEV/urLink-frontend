import React from 'react';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';

import LogoGoogle from '@images/logo-google.png';

import { useUser } from '@modules/user/hooks/useUser';

function GregisterButton() {
  const { gRegisterThunk } = useUser();

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      await gRegisterThunk();
      window.location.href = '/index.html';
    } catch (error) {
      toast.error(error?.response?.data?.message || '네트워크 오류!!');
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
