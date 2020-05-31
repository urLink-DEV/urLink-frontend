/* global chrome */
import React, {useState, useEffect} from 'react'
import auth from './commons/apis/auth'
import CategoryPage from './pages/category/CategoryPage'
import MainPage from './pages/MainPage'

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    auth.tokenCheck()
      .then(res => {
        if (res) setUser(true);
      })
      .catch(e => console.log(e))
  }, []);

  return (
    user ? <CategoryPage /> : <MainPage />
  )
}

export default App;