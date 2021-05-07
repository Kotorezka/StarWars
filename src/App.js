import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";



import './App.css';

import Home from './pages/Home';
import Films from './pages/Films';
import People from './pages/People';
import Planets from '../src/pages/Planets';
import Species from '../src/pages/Species';
import Starships from '../src/pages/Starships';
import Vehicles from '../src/pages/Vehicles';


class App extends Component {
  render() {
    const { history } = this.props

    
    return (
      <div className="App">
        
        <Switch>
        <Route history={history} path='/home' component={Home} />
          <Route history={history} path='/films' component={Films} />
          <Route history={history} path='/people' component={People} />
          <Route history={history} path='/planets' component={Planets} />
          <Route history={history} path='/species' component={Species} />
          <Route history={history} path='/starships' component={Starships} />
          <Route history={history} path='/vehicles' component={Vehicles} />
          <Redirect from='/' to='/Home'/>
        </Switch>
        
      </div>
    );
  }
}

export default withRouter(App)