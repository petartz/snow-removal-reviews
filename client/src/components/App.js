<<<<<<< HEAD
import React, { useState, useEffect, } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
=======
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
>>>>>>> efccf9b05e1f2527203d6706dec1990b041ad837
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import ServicesIndex from "./layout/ServicesIndex"
import ShowService from './layout/ShowService'


const App = (props) => {
<<<<<<< HEAD
=======

>>>>>>> efccf9b05e1f2527203d6706dec1990b041ad837
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        
        <Route exact path="/">
          <ServicesIndex user={currentUser}/>
        </Route>

        <Route exact path="/services/:id">
          <ShowService user = {currentUser}/>
        </Route>

        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default (hot(App));
