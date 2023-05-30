// Include Express module to set a server in this project
const express = require('express')
const app = express()
const mongoose = require('mongoose') // Include Mongoose to connect MongoDB
const exphbs = require('express-handlebars') // Include Express-handlebars to use template engine
const port = 3000 // Set server variable
const Restaurants = require('./models/restaurant') // Introduce the restaurants Schema I created before

// Use dotenv on informal environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Get the connection after connect to the database
const db = mongoose.connection

// Connect error
db.on('error', () => {
  console.log('mongodb error')
})

// Connect successfully
db.once('open', () => {
  console.log('mongodb connected!')
})

/* 
Set template engine:
1. Name the engine, and let the 'main' file to be as the default layout
2. Set the 'view engine' is 'handlebars'
*/
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Tell Express use static files from './public/'
app.use(express.static('public'))

// Set root route
app.get('/', (req, res) => {
  // Find the data and render them to the home web
  Restaurants.find()
    .lean()
    .then(restaurants => res.render(`index`, { restaurants })) // Render each restaurant information => { restaurants: restaurants }
    .catch(error => console.error(error))
})

// Set show route
app.get('/restaurants/:restaurant_id', (req, res) => {

  // Find the restaurant information user clicked
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  // Render the restaurant information user clicked => { restaurant: restaurant }
  res.render('show', { restaurant })
})

// Set search route
app.get('/search', (req, res) => {

  // Collect the keyword
  const keyword = req.query.keyword

  // Find the restaurants match the keyword => search by name or category
  const searchResults = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))

  // Render the results => { keyword: keyword }
  res.render('index', { restaurants: searchResults, keyword })
})

// Set a listener to return address
app.listen(port, () => {
  console.log(`This project is running on http://localhost:${port}`)
})
