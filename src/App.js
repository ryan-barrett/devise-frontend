import React          from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}                     from 'react-router-dom';
import BoardContainer from './containers/BoardContainer';
import LoginContainer from './containers/LoginContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginContainer/>
          </Route>
          <Route path="/">
            <BoardContainer boardId="board-5178f6b2-994c-47d8-bb0f-a1a778f016e9213"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
