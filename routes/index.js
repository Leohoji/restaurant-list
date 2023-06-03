// This file is a total router that processing any routes user requested.

const express = require('express') // Include Express and Express Router
const router = express.Router()
const home = require('./modules/home')
const restaurantCRUD = require('./modules/restaurantsCRUD')
const search = require('./modules/search')

router.use('/', home) // router.use(path, callback)
router.use('/restaurant', restaurantCRUD)
router.use('/search', search)

module.exports = router