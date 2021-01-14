import React from 'react';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';

import LogoGoogle from '@images/logo-google.png';

import { useUser } from '@modules/user/hooks/useUser';

function GloginButton() {
  const { gloginThunk } = useUser();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await gloginThunk();
      window.location.href = '/index.html';
    } catch (error) {
      toast.error(error.response?.data?.message || '네트워크 오류!!');
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
