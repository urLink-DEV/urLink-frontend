/* global chrome */
import React, {useState, useEffect} from 'react'
import auth from './commons/apis/auth'
import CategoryPage from './pages/category/CategoryPage'
import GetStartPage from './pages/GetStartPage'
import LoginContainer from './containers/LoginContainer'

function App() {
  
  const [user, setUser] = useState(false)
  const [init , setInit] = useState(false)

  useEffect(() => {
    // if (chrome.runtime.onMessage) {
    //   chrome.runtime.onConnect.addListener(function(port) {
    //     // console.assert(port.name == "install");
    //     console.log(port)
    //     port.onMessage.addListener(function(msg) {
    //       console.log("ss", msg)
    //       if (msg.message == "install") setInit(true)
    //     });
    //   });

      // chrome.runtime.onMessage.addListener(
      //   function (request, sender, sendResponse) {
      //     if (request.message == "install") {
      //       setInit(true)
      //     }
      //   })
    // }

    auth.tokenCheck()
      .then(res => {
        if (res) setUser(true);
      })
      .catch(e => console.log(e))
  }, [])

  return (
    init ? <GetStartPage /> :
      user ? <CategoryPage /> : <GetStartPage />
  )
}

export default App;