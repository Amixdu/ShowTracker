// import './App.css';
import React, { useState, useRef, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import MainPage from './MainPage';
import Signup from './Signup';
import { Container } from 'react-bootstrap'
import AuthProvider from './contexts/AuthContext';
import List from './List';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';


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

              <PrivateRoute path="/list" component={List} />

              <div style={{ backgroundColor:'#1569C7'}}>

                <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                  <div className='w-100' style={{ maxWidth: '400px' }}>

                    <Route path="/login">
                      <Login />
                    </Route>

                    <Route path="/signup">
                      <Signup />
                    </Route>

                    <PrivateRoute path="/home" component={Home} />

                    <Route path="/forgot-password">
                      <ForgotPassword />
                    </Route>

                  </div>

                </Container>

              </div>

            </Switch>

        </div>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
