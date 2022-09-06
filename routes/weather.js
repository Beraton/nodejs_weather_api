const express = require('express')
const router = express.Router()

const { getAllWeather, getWeeklyWeather } = require('../controllers/weather')

router.get('/', getAllWeather)
router.get('/weekly', getWeeklyWeather)

module.exports = router
