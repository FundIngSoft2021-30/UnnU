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
          <div>
            <Navbar />
            <Route path='/' exact component={Home} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route exact path="/Reset" component={Reset} />
          </div>

        </Switch>

      </Router>



    </>
  );
}

export default App;
