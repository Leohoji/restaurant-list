// Include Express module to set a server in this project
const express = require('express')
const mongoose = require('mongoose') // Include Mongoose to connect MongoDB
const exphbs = require('express-handlebars') // Include Express-handlebars to use template engine
const port = 3000 // Set server variable
const Restaurants = require('./models/restaurant') // Introduce the restaurants Schema I created before
const bodyParser = require('body-parser') // Include the body parser to parse req body

// Use dotenv on informal environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Use Express model
const app = express()

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Get the connection after connect to the database
const db = mongoose.connection

// Connect error and connect successfully
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// Set template engine:
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // Name the engine, and let 'main' file as default layout
app.set('view engine', 'handlebars') // Set 'view engine' is 'handlebars'
app.use(express.static('public')) // Tell Express use static files from './public/'
app.use(bodyParser.urlencoded({ extended: true })) // Regulate each request to be prepared by body-parser


//------------------- Set root route ---------------------------------
app.get('/', (req, res) => {
  // Find the data and render them to the home web
  Restaurants.find()
    .lean()
    // Render each restaurant information => { restaurants: restaurants }
    .then(restaurants => res.render(`index`, { restaurants }))
    .catch(error => console.error(error))
})

//--------- Set "create" route to realize the "C" in CRUD ------------
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

// Set create "POST" route
app.post('/restaurant', (req, res) => {
  const data = req.body
  return Restaurants.create([{
    name: data.name,
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
