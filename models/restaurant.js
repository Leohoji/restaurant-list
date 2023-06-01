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
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true }
})
module.exports = mongoose.model('Restaurant', RestaurantSchema)
