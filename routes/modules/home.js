// This file is a "homepage" route, that is responsible for processing instructions related to the homepage. 
const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant') // Introduce the restaurants Schema I created before

router.get('/', (req, res) => {
  // Find the data and render them to the home web
  return Restaurants.find()
    .lean() // clean the data gotten from MongoDB
    // Render each restaurant information => { restaurants: restaurants }
    .then(restaurants => res.render(`index`, { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router