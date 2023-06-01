// This seeder generates restaurants data to MongoDB
const mongoose = require('mongoose') // Include mongoose
const Restaurant = require('../restaurant') // Include restaurant model
const restaurants = require('../../restaurant.json').results // Include the restaurants data

// Use the environmental variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to database
const db = mongoose.connection // Set a variable to pick up the return connection 

// Connect error
db.on('error', () => {
  console.log('mongodb error')
})

// Connect successfully
db.once('open', () => {
  console.log('mongodb connected!')

  // Create the data
  for (let restaurant of restaurants) {
    Restaurant.create(restaurants)
  }
  console.log('All the data have been inserted into the MongoDB!')
})
