// import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import MainPage from './MainPage';
import Signup from './Signup';
import AuthProvider from './contexts/AuthContext';
import List from './List';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';
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

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/signup">
                <Signup />
              </Route>

              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>

              <PrivateRoute path="/home" component={Home} />

              <PrivateAdminRoute path="/admin-add" component={AdminAdd} />
              
            </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;