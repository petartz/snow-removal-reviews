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
import kelvinConverter from "../services/KelvinConverter";

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
      console.log(latitude, longitude)
    }
    console.log(latitude, longitude)

    try{
      const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=d8e8742fa1b1aa5b85716c6144013e98`)
      const body = await response.json()
      let temp = kelvinConverter(body.list[0].main.temp)
      setForecast({
        city: body.city.name,
        temp: temp,
        description: body.list[0].weather[0].description            
      })
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
    }catch(error){
      console.log(error)
    }
  }
  const confirmLocationConsent = () => {
    if (confirm(`Use your location to get current weather?`)){
      window.navigator.geolocation.getCurrentPosition(successfulLookup, console.log)
    }else{
      alert('no weather for you')
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
