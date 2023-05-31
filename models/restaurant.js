// Here I will create a Schema for restaurant list database
const mongoose = require('mongoose') // Include Mongoose module to set schema
const Schema = mongoose.Schema // Create Schema variable
/* 
Create Schema constructor, my data structure following:
"name": name,
"category": category,
"image": image,
"location": location,
"phone": phone,
"google_map": map,
"rating": rating,
"description": description
*/
const RestaurantSchema = new Schema({
  name: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String
})
module.exports = mongoose.model('Restaurant', RestaurantSchema)
