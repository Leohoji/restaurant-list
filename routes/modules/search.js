// This file, a search route, is responsible for processing "search" request.

const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant') // Introduce the restaurants Schema I created before

//--------------- Set search route -----------------------------------
router.get('/', (req, res) => {

  // Collect the keyword
  const keyword = req.query.keyword

  // Find the restaurants match the keyword => search by name or category
  return Restaurants.find()
    .lean()
    .then(restaurants => {
      const searchResults = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      // Render the results => { keyword: keyword }
      res.render('index', { restaurants: searchResults, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router