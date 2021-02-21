import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import "./App.css";
import LogoBar from "./LogoBar";
import NaviBar from "./NaviBar";
import MapSheet from "./MapSheet";
import Farmers from "./Farmers";

function App() {
  return (
    <div className="app">
      <div>
        
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/map" component={MapSheet} />
              <Route path="/farmers" component={Farmers} />
            </Switch>
          </AuthProvider>
          <NaviBar />
        </Router>
        <LogoBar />
      </div>
    </div>
  );
}

export default App;
