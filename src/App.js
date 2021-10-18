import React from 'react';

import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Privateroute from './components/pages/Privateroute';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Reset from './components/pages/Reset';
import Homeuser from './components/userpages/homeuser';
import Editprofile from './components/userpages/editprofile';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Privateroute path='/user-home' component={Homeuser} />
          <Privateroute path='/sign-up' component={SignUp} />
          <Privateroute path='/login' component={Login} />
          <Privateroute path="/Reset" component={Reset} />
          <Privateroute path="/editprofile" component={Editprofile} />
          <div>
            <Route path='/' exact component={Home} />
          </div>

        </Switch>

      </Router>
    </>
  );
}

export default App;
