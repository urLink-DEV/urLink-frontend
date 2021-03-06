import React from 'react';
import { Router } from 'react-chrome-extension-router';
import GetStartPage from './pages/Start';
import { getAccessToken } from '@commons/http/auth';
import Snackbar from '@components/Toast';
import { useToast } from '@modules/ui';
import Home from '@pages/Home';

function App() {
  return (
    <>
      <Router>{getAccessToken() ? <Home /> : <GetStartPage />}</Router>
      <ToastContainer />
    </>
  );
}

function ToastContainer() {
  const { open, type, message, close } = useToast();
  return <Snackbar open={open} type={type} message={message} close={close} />;
}
export default App;
