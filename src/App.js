import React from 'react';

import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/homepage/Home';
import Privateroute from './Pages/homepage/Privateroute';
import SignUp from './Pages/SignUp/SignUpC';
import Login from './Pages/login/LoginC';
import Reset from './Pages/login/ResetC';
import Homeuser from './Pages/perfil/perfil';
import Editprofile from './Pages/perfil/editar';
import Match from './Pages/match/Match';
import Suerte from './Pages/match/tengosuerte';
import Calendar from './Pages/calendario/calendario';
import Chat from './Pages/chat/chat';


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
