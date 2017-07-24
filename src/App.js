import React, { Component } from 'react'
import 'react-select/dist/react-select.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'
import ServantList from './servantList'
import ServantGather from './servantGather'
import NpGather from './npGather'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={ServantList} exact />
          <Route path="/servant" component={ServantList} exact />
          <Route path="/np/:id" component={NpGather} />
          <Route path="/servant/:id" component={ServantGather} />
        </div>
      </Router>
    );
  }
}

export default App;
