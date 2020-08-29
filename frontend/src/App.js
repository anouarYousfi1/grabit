import React from "react";
import "./style/App.css";
import Background from "./components/home/Background";
import HeaderContent from "./components/home/HeaderContent";
import Content from "./components/home/Content";
import Section from "./components/home/Section";
import Footer from "./components/home/Footer";
import SignUpModal from "./components/home/SignInModal";

/* Signup as a customer Page*/
import Signup from "./components/signup/Signup";

/* Signup as a customer Page*/
import Profile from "./components/profile/Profile";

import Order from "./components/order/Order";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignupProvider } from "./contexts/SignupContext";
import { UserProvider } from "./contexts/userContext";

function App() {
  return (
    <SignupProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Background />
                <HeaderContent />
                <SignUpModal />
                <Content />
                <Section />
                <Footer />
              </Route>

              <Route path="/signup/customer">
                <Signup number="1" />
              </Route>

              <Route path="/signup/driver">
                <Signup number="0" />
              </Route>

              <Route path="/profile">
                <Profile />
              </Route>

              <Route path="/order">
                <Order />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </SignupProvider>
  );
}

export default App;
