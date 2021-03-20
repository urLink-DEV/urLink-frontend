import React, { useState, useEffect, createContext, useContext } from 'react'
import DefaultImg from '../images/logo/profileImg.png'
import {AlertModal} from '../components/modal'

const ProfileContext = createContext({})
export const useProfileContext = () => useContext(ProfileContext)

const Profile = (props) => {

  const {getUser, removeUser} = props
  
  const [profile, setProfile] = useState({name: '', email: '', img: ''})
  const [alertModalInfo, setAlertModalInfo] = useState({})

  const { btnText, modalText, openBool, onClose, onClickOk } = alertModalInfo

  useEffect(() => {
    if(!(!!profile.name)) {
      getUser({})
      .then(res => res.data)
      .then(res => setProfile({
        name: res.username,
        email: res.email,
        img: DefaultImg
      }))
    }
  },[profile])
  
  return (
    <>
      <ProfileContext.Provider value={{ profile, removeUser, setAlertModalInfo }}>
        {props.children}
      </ProfileContext.Provider>
      <AlertModal
        btnText={btnText}
        modalText={modalText}
        openBool={openBool}
        onClose={onClose}
        onClickOk={onClickOk}
      />
    </>
  )
}

export default Profile