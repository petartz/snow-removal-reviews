# snow-removal-reviews
Group project for Launch Academy. Creating a review site for snow removal services.

Authors: Lilly Fang, Nicholas Costagliola, James Corey, Paul Cadle, Petar Tzonevski
Name: Snow Removal Service Review

Heroku: https://snow-removal-reviews-v2.herokuapp.com/

Description: This project is aimed at creating a full-stack react/express application to house reviews for
snow removal services in the New England area.
- Users can see services that have been added and any reviews associated with those services.
- Users can register or sign in to add a new service and add new reviews to a service.  When signed in, users can also upvote or downvote reviews, with one vote per review allowed for each user. 
- Users can edit and delete reviews that they have created. 
- Users can also filter posted services through a search bar feature.
- Users can see the weather forecast for their location on the service index page. 

Instructions: 
- Create a database by running 'createdb snow-removal-service-reviews_development'.
- From the server folder, run 
        ```yarn install```
        ```yarn migrate:latest```
        ```yarn db:seed```
- Create a .env file in your server folder and include the following: 
  SESSION_SECRET="{your session secret}"
  WEATHER_API="{your OpenWeatherAPI key}"
- From the root folder, run ```yarn dev```
- Navigate to localhost:3000 in your browser to see the app 

This application uses React, Express, Node, Objection, Knex, and Postgres. It also makes a call to the OpenWeatherAPI.  
