import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Privateroute from './components/pages/Privateroute';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Reset from './components/pages/Reset';
import homeuser from './components/userpages/homeuser';
function App() {
  return (
    <>

      <Router>


        <Switch>
          <Privateroute path='/user-home' component={homeuser} />
          <Privateroute path='/sign-up' component={SignUp} />
          <Privateroute path='/login' component={Login} />
          <Privateroute exact path="/Reset" component={Reset} />
          <div>
            <Navbar />
            <Route path='/' exact component={Home} />

            
          </div>

        </Switch>

      </Router>



    </>
  );
}

export default App;
