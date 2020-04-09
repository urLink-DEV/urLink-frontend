import React from 'react';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.scss';

function Main() {
  return (
    <div>
      hello URLink
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Main} />
        <Route exact path={"/login"} component={LoginPage}/>
        <Route exact path={"/signup"} component={SignupPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
