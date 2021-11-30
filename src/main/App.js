import React, { useEffect } from 'react'

import moment from 'moment'
import { Router } from 'react-chrome-extension-router'
import { useLocation } from 'react-router-dom'

import Snackbar from '@main/components/Toast'
import Home from '@main/pages/Home'
import { useToast } from '@modules/ui'
import { GAPageview, initGA } from '@utils/ga'
import { getAccessToken } from '@utils/http/auth'

import GetStartPage from './pages/Start'

import 'moment/locale/ko'

moment.locale('ko')

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    GAPageview(pathname)
  }, [pathname])

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
