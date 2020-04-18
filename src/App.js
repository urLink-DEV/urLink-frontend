import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './containers/Login';

function Main() {
  return (
    <div>
      hello Urlink
    </div>
  )
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
