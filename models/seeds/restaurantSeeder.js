// This seeder generates restaurants data on MongoDB

const Restaurant = require('../restaurant') // Include restaurant model
const restaurants = require('../../restaurant.json').results // Include the restaurants data
const db = require('../../config/mongoose')

// Connect successfully
db.once('open', () => {
  // Create the data
  for (let restaurant of restaurants) {
    Restaurant.create(restaurant)
  }
  console.log('All the data have been inserted into the MongoDB!')
})
