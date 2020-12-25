import React, { useState, useEffect } from 'react';
import auth from './commons/apis/auth';
import Signup from './pages/Signup';
// import GetStartPage from './pages/GetStartPage';

function App() {
  const [user, setUser] = useState(false);

  // useEffect(() => {
  //   auth
  //     .tokenCheck()
  //     .then((res) => {
  //       if (res) setUser(true);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return <Signup />;
}

export default App;
