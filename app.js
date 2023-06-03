// Include Express module to set a server in this project
const express = require('express')
const mongoose = require('mongoose') // Include Mongoose to connect MongoDB
const exphbs = require('express-handlebars') // Include Express-handlebars to use template engine
const port = 3000 // Set server variable
const Restaurants = require('./models/restaurant') // Introduce the restaurants Schema I created before
const bodyParser = require('body-parser') // Include the body parser to parse req body
const methodOverride = require('method-override') // Include method-override to override "PUT" and "DELETE" route

// Use dotenv on informal environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Use Express model
const app = express()

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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
app.use(methodOverride('_method')) // Each request will be prepared by method-override

//------------------- Set root route ---------------------------------
app.get('/', (req, res) => {
  // Find the data and render them to the home web
  return Restaurants.find()
    .lean() // clean the data gotten from MongoDB
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
app.get('/restaurant/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id //get id from MongoDB database
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})


//--------- Set "edit" route to realize the "U" in CRUD ------------
app.get('/restaurant/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.put('/restaurant/:restaurant_id', (req, res) => {
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
app.delete('/restaurant/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurants.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//--------------- Set search route -----------------------------------
app.get('/search', (req, res) => {

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


// Set a listener to return address
app.listen(port, () => {
  console.log(`This project is running on http://localhost:${port}`)
})
