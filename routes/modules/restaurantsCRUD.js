// This file is a "CRUD" route, that is responsible for processing instructions related to the CRUD user requested. 
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') // Include Mongoose to connect MongoDB
const Restaurants = require('../../models/restaurant') // Introduce the restaurants Schema I created before

//--------- Set "create" route to realize the "C" in CRUD ------------
router.get('/new', (req, res) => {
  return res.render('new')
})

// Set create "POST" route
router.post('/', (req, res) => {
  const data = req.body //get post info from req.body
  return Restaurants.create([{
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    image: data.image,
    location: data.location,
    phone: data.phone,
    google_map: data.google_map,
    rating: data.rating,
    description: data.description
  }])
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//--------- Set "show" route to realize the "R" in CRUD ------------
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id //get id from MongoDB database
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})


//--------- Set "edit" route to realize the "U" in CRUD ------------
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const restaurantEdited = req.body

  if (mongoose.Types.ObjectId.isValid(id)) {
    // Use "findByIdAndUpdate" to update the MongoDB database by Mongoose, "new" parameter can return the data revised.
    return Restaurants.findByIdAndUpdate(id, restaurantEdited, { new: true })
      .then((data) => {
        console.log(data) // return the data I revised
        res.redirect(`/restaurant/${id}`) //redirect to the "detail" page
      })
      .catch((error) => console.log(error))
  }
})


//--------- Set "delete" route to realize the "D" in CRUD ------------
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurants.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router