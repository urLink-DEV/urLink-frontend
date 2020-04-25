import React from 'react';
import {Link, Router} from "react-chrome-extension-router";
import Login from './containers/Login';

function Main() {
  return (
    <div>
      hello Urlink
      <Link component={Login}>
        Login
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

export default App;
