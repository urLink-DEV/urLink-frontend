/* global chrome */
import React from 'react';
import {Link, Router} from "react-chrome-extension-router";
// import {Switch, BrowserRouter, Route} from "react-router-dom";
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
import Login from './containers/Login';
import './App.scss';

function Main() {
  console.log('chrome', chrome);

  return (
    <div>
      hello Urlink
      
      <Link component={Login}>
        login
      </Link>
    </div>
  )
}

function App() {

  return (
    <Router>
        <Main />
    </Router>
  );
}

// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path={"/"} component={Main} />
//         <Route exact path={"/login"} component={LoginPage}/>
//         <Route exact path={"/signup"} component={SignupPage}/>
//       </Switch>
//     </BrowserRouter>
//   );
// }

export default App;
