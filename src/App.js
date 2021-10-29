import React from 'react';

import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/homepage/Home';
import Privateroute from './components/Pages/homepage/Privateroute';
import SignUp from './components/Pages/SignUp/SignUp';
import Login from './components/Pages/login/Login';
import Reset from './components/Pages/login/Reset';
import Homeuser from './components/Pages/perfil/homeuser';
import Editprofile from './components/Pages/perfil/editprofile';
import Match from './components/Pages/match/Match';
import Suerte from './components/Pages/match/tengosuerte';
import Calendar from './components/Pages/calendario/calendario';
import Chat from './components/Pages/chat/chat';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Privateroute path='/tengosuerte' component={Suerte} />
          <Privateroute path='/calendario' component={Calendar} />
          <Privateroute path='/chat' component={Chat} />
          <Privateroute path='/match' component={Match} />
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
