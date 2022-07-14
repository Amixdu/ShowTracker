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
import AdminUpdate from './AdminUpdate';
import AdminAdd from './AdminAdd';
import AdminPage from './AdminPage';
import UserAdd from './UserAdd';
import PrivateAdminRoute from './PrivateAdminRoute';

function App() {

  return (
    <Router>
      <AuthProvider>
        <div className="App" style={{ minHeight: "100vh" }}>
            {/* Enter Nav Bar outside of Switch */}
            <Switch>

              <Route exact path="/">
                <MainPage />
              </Route>
              


              <PrivateRoute path="/browse-shows" component={UserAdd} />

              <PrivateAdminRoute path="/admin" component={AdminPage} />

              <PrivateRoute path="/list" component={List} />


            
              {/* <div style={{ backgroundColor:'#121212', minHeight: "100vh" }}> */}

              {/* </div> */}

              <div style={{ backgroundColor:'#1569C7' }}>

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

                    <PrivateAdminRoute path="/admin-update" component={AdminUpdate} />

                    <PrivateAdminRoute path="/admin-add" component={AdminAdd} />

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