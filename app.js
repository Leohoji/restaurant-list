// Include Express module to set a server in this project
const express = require('express')
const app = express()

// Include Express-handlebars to use template engine
const exphbs = require('express-handlebars')

// Set server variable
const port = 3000

// Introduce the restaurants information
const restaurants = require('./restaurant.json').results

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

  // Render each restaurant information => { restaurants: restaurants }
  res.render(`index`, { restaurants })
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
