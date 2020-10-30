import React              from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}                         from 'react-router-dom';
import BoardContainer     from './containers/BoardContainer';
import LoginContainer     from './containers/LoginContainer';
import './App.css';
import DashboardContainer from './containers/DashboardContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginContainer/>
          </Route>
          <Route path="/boards/:id">
            <BoardContainer/>
          </Route>
          <Route path='/boards'>
            <DashboardContainer/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
