import React from 'react'

import { Router } from 'react-chrome-extension-router'

import Snackbar from '@main/components/Toast'
import Home from '@main/pages/Home'
import { useToast } from '@modules/ui'
import { getAccessToken } from '@utils/http/auth'

import GetStartPage from './pages/Start'

function App() {
  return (
    <>
      <Router>{getAccessToken() ? <Home /> : <GetStartPage />}</Router>
      <ToastContainer />
    </>
  )
}

function ToastContainer() {
  const { open, type, message, close } = useToast()
  return <Snackbar open={open} type={type} message={message} close={close} />
}

export default App
