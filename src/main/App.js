import React, { useEffect } from 'react'

import moment from 'moment'
import { Router } from 'react-chrome-extension-router'
import ReactGA from 'react-ga'

import Snackbar from '@main/components/Toast'
import Home from '@main/pages/Home'
import { useToast } from '@modules/ui'
import { getAccessToken } from '@utils/http/auth'

import GetStartPage from './pages/Start'

import 'moment/locale/ko'

moment.locale('ko')

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-207149982-2')
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

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
