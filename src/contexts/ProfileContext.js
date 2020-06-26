import React, { useState, useEffect, createContext, useContext } from 'react'
import DefaultImg from '../images/logo/profileImg.png'

const ProfileContext = createContext({})
export const useProfileContext = () => useContext(ProfileContext)

const Profile = (props) => {

  const {getUser} = props
  
  const [profile, setProfile] = useState({name: '', email: '', img: ''})
  useEffect(() => {
    getUser()
      .then(res => res.data)
      .then(res => setProfile({
        name: res.username,
        email: res.email,
        img: DefaultImg,
      }))
    
  }, [])
  
  return (
    <ProfileContext.Provider value={profile}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default Profile