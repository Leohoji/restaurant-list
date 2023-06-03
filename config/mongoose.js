// This file, mongoose route, is responsible for MongoDB operation flow needs 
const mongoose = require('mongoose') // Include Mongoose to connect MongoDB

// Use dotenv on informal environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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

module.exports = db