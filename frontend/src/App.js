import React from "react";
import "./frontend/style/App.css";
import Background from "./frontend/components/home/Background";
import HeaderContent from "./frontend/components/home/HeaderContent";
import Content from "./frontend/components/home/Content";
import Section from "./frontend/components/home/Section";
import Footer from "./frontend/components/home/Footer";
import SignUpModal from "./frontend/components/home/SignInModal";

/* Signup as a customer Page*/
import Signup from "./frontend/components/signup/Signup";

/* Signup as a customer Page*/
import Profile from "./frontend/components/profile/Profile";

import Order from "./frontend/components/order/Order";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignupProvider } from "./frontend/contexts/SignupContext";
import { UserProvider } from "./frontend/contexts/userContext";

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
