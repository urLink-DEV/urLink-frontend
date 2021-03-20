import React, {useState, useEffect} from 'react'
import auth from './commons/apis/auth'
import CategoryPage from './pages/category/CategoryPage'
import GetStartPage from './pages/GetStartPage'

function App() {
  
  const [user, setUser] = useState(false)

  useEffect(() => {
    auth.tokenCheck()
      .then(res => { if (res) setUser(true) })
      .catch(e => console.log(e))
  }, [])

  return (
    user ? <CategoryPage /> : <GetStartPage />
  )
}

export default App