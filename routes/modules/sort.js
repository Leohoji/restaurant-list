// This file, a sort route, is responsible for processing "sort" request.

const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant') // Introduce the restaurants Schema I created before

//--------------- Set sort route ---------------------------

const sortArray = ['asc', 'desc'] // "asc" and "desc" sorting

for (let index in sortArray) {
  const item = sortArray[index] // get sort item
  router.get(`/${item}`, (req, res) => {
    const button = (index <= 0) ? 'A to Z' : 'Z to A' //get button name
    return Restaurants.find()
      .lean()
      .sort({ name_en: `${item}` })
      .then(restaurantSort => {
        res.render('index', { restaurants: restaurantSort, button })
      })
  })
}

// "category" sorting
router.get('/category', (req, res) => {
  const button = '種類' //get button name
  return Restaurants.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurantSort => {
      res.render('index', { restaurants: restaurantSort, button })
    })
})

// "location" sorting
router.get('/location', (req, res) => {
  const button = '地區' //get button name 
  return Restaurants.find()
    .lean()
    .sort({ location: 'asc' })
    .then(restaurantSort => {
      res.render('index', { restaurants: restaurantSort, button })
    })
})

module.exports = router