import React from "react";
import "../style/App.css";
import Background from "../components/Background";
import HeaderContent from "../components/HeaderContent";
import Content from "../components/Content";
import Section from "../components/Section";
import Footer from "../components/Footer";
import SignUpModal from "../components/SignInModal";

/* Signup as a customer Page*/
import Signup from "../components/Signup";

/* Signup as a customer Page*/
import Profile from "../components/Profile";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignupProvider } from "../contexts/SignupContext";
import { UserProvider } from "../contexts/userContext";

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
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </SignupProvider>
  );
}

export default App;
