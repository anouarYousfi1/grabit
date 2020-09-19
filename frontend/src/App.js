import React, { useEffect, useContext } from "react";
import "./style/App.css";
import Background from "./components/home/Background";
import HeaderContent from "./components/home/HeaderContent";
import Content from "./components/home/Content";
import Section from "./components/home/Section";
import Footer from "./components/home/Footer";
import SignUpModal from "./components/home/SignInModal";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import Order from "./components/order/Order";
import SocketIOClient from "./socket.io-client/SocketIOClient";
import Track from "./components/track/Track";

import L from "leaflet";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignupProvider } from "./contexts/SignupContext";
import { UserProvider } from "./contexts/userContext";
import { OrderProvider } from "./contexts/OrderContext";
import { LocationProvider } from "./contexts/LocationContext";

function App() {
  return (
    <SignupProvider>
      <UserProvider>
        <OrderProvider>
          <LocationProvider>
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

                  <Route path="/track">
                    <Track />
                  </Route>
                </Switch>

                <SocketIOClient />
              </div>
            </Router>
          </LocationProvider>
        </OrderProvider>
      </UserProvider>
    </SignupProvider>
  );
}

export default App;
