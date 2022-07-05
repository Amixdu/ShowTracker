import './App.css';
import React, { useState, useRef, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import MainPage from './MainPage';
import Signup from './Signup';

function App() {


  let randomId = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  

  return (
    <Router>
      <div className="App">

        {/* Enter Nav Bar outside of Switch */}

        <Switch>

          <Route exact path="/">
            <MainPage />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

        </Switch>

      </div>
    </Router>
    
  );
}

export default App;
