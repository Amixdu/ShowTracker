// import './App.css';
import React, { useState, useRef, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import MainPage from './MainPage';
import Signup from './Signup';
import { Container } from 'react-bootstrap'
import AuthProvider from './contexts/AuthContext';


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
      <AuthProvider>
        <div className="App">

          {/* Enter Nav Bar outside of Switch */}

          <Switch>

            <Route exact path="/">
              <MainPage />
            </Route>

            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh "}}>
              <div className='w-100' style={{ maxWidth: '400px' }}>

                <Route path="/login">
                  <Login />
                </Route>

                <Route path="/signup">
                  <Signup />
                </Route>

                <Route exact path="/home">
                  <Home />
                </Route>

              </div>
            </Container>
            

            <Route path="/home">
              <Home />
            </Route>

          </Switch>

        </div>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
