import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  // const [location, setLocation] = useState({
  //   lat: 0,
  //   long: 0
  // })
  // const [forecast, setForecast] = useState({
  //   city: '',
  //   temp: ''
  // })
  // const successfulLookup = async position => {
  //   const { latitude, longitude } = position.coords
  //   console.log(latitude, longitude)
  //   // setLocation({lat: latitude, long: longitude})
  //   try{
  //     const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f2f86640139e21f2e625867855478652`)
  //     const body = await response.json()
  //     // setForecast({city: body.city.name})
  //     console.log(body.city.name)
  //     debugger
  //     if(!response.ok){
  //       throw new Error(`${response.status} ${response.statusText}`)
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  // window.navigator.geolocation.getCurrentPosition(successfulLookup, console.log)

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="submit-button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">Snow Removal Service Reviews</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>{location.latitude} {location.longitude}</li> */}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
