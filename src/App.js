import React from 'react';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import Login from './containers/Login';
// import GoogleLogin from './containers/GoogleLogin';
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
        <Route path={"/login"} component={Login}/>
        <Route exact path={"/"} component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
