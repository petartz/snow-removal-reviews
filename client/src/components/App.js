import React, { useState, useEffect, } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import ServicesIndex from "./layout/ServicesIndex"
import ShowService from './layout/ShowService'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }
  
  const [forecast, setForecast] = useState({})
  let locationConsent = true
  const successfulLookup = async position => {
    let latitude = 42.364758
    let longitude = -71.067421
      if (locationConsent) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
      }
      try{
        const response = await fetch (`/api/v1/weather/${latitude}&${longitude}`)
        const body = await response.json()
        setForecast({
          city: body.city,
          temp: body.temp,
          description: body.description
        })
      } catch(error) {
        console.error(error)
      }
  }

  const confirmLocationConsent = () => {
    if (confirm(`May we use your location to get current weather?  Click cancel to default to Boston`)){
      window.navigator.geolocation.getCurrentPosition(successfulLookup, console.log)
    }else{
      locationConsent = false
      successfulLookup()
    }
  }

  useEffect(() => {
    fetchCurrentUser()
    confirmLocationConsent()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        
        <Route exact path="/">
          <ServicesIndex 
            user={currentUser}
            forecast={forecast}
          />
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
