import React, { useState, useEffect, createContext, useContext } from 'react'

const ProfileContext = createContext({})
export const useProfileContext = () => useContext(ProfileContext)

const Profile = (props) => {

  const [profile, setProfile] = useState({name: '', email: '', img: ''})
  console.log(profile)
  useEffect(() => {
    setProfile({
      name: '녹챠챠',
      email: 'isoo7510@gmail.com',
      img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    })
  }, [])
  
  return (
    <ProfileContext.Provider value={profile}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default Profile