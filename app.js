// Include Express module to set a server in this project
const express = require('express')
const exphbs = require('express-handlebars') // Include Express-handlebars to use template engine
const port = 3000 // Set server variable
const bodyParser = require('body-parser') // Include the body parser to parse req body
const methodOverride = require('method-override') // Include method-override to override "PUT" and "DELETE" route
const routes = require('./routes') // Introduce routes

// Use Express model
const app = express()

// Connect to MongoDB database
require('./config/mongoose')

// Set template engine:
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // Name the engine, and let 'main' file as default layout
app.set('view engine', 'handlebars') // Set 'view engine' is 'handlebars'

// Set source used from
app.use(express.static('public')) // Tell Express use static files from './public/'
app.use(bodyParser.urlencoded({ extended: true })) // Regulate each request to be prepared by body-parser
app.use(methodOverride('_method')) // Each request will be prepared by method-override
app.use(routes) // Introduce request to routes


// Set a listener to return address
app.listen(port, () => {
  console.log(`This project is running on http://localhost:${port}`)
})
